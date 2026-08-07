"use client";
import ConfirmDelete from "@/components/tables/ConfirmDelete";
import ComponentTable from "@/components/tables/Table";
import Spinner from "@/components/ui/Spinner";
import axiosInstance from "@/core/hooks/useAxiosService";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import AddButton from "@/components/button/add-button";
import { crypto } from "@/lib/index";

type Page = {
  id: number;
  name: string;
  title: string;
  view: number;
  view_in_month: number;
  create_time: string;
};

const cols = [
  { title: "index", field: "index", type: "index", show: true, sort: true },
  { title: "name", field: "name", show: true, sort: false },
  { title: "status", field: "", type: "status", show: true, sort: false },
  { title: 'translations', field: '', type: 'translations', show: true, sort: false },
  {
    title: "createTime",
    field: "create_time",
    type: "date",
    show: true,
    sort: false,
  },
  {
    title: "updateTime",
    field: "update_time",
    type: "date",
    show: true,
    sort: false,
  },
  {
    title: "lblAction",
    field: "action",
    type: "action",
    show: true,
    sort: false,
  },
];

export default function GetList() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Page[]>([]);
  const [rowTotal, setRowTotal] = useState<number>();
  const [lastId, setLastId] = useState<string>("999999999999999");
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Page | null>(null);
  const [keysearch, setKeyword] = useState("");
  const [keywordDebounced, setKeywordDebounced] = useState("");

  useEffect(() => {
    document.title = "question-management";
    const fetchData = async () => {
      await getList({ lastId: "999999999999999", keysearch: keywordDebounced }, true);
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywordDebounced]);
  // Hàm xử lý hành động
  const handleAction = (action: string, item: Page) => {
    switch (action) {
      case "delete":
        setSelectedItem(item);
        setConfirmOpen(true);
        break;
      case "update":
        const encryptedId = crypto.encrypt(item.id.toString());
        router.push(`/admin/question-management/process?id=${encryptedId}`);
        break;
      case "change-status":
        changeStatus(item);
        break;
      case "change-pin":
        changePin(item);
        break;
      case "pagination":
        getList();
        break;
      default:
        console.warn(`Unknown action: ${action}`);
    }
  };

  const getList = async (params = { lastId, keysearch }, isSearch = false) => {
    try {
      const res = await axiosInstance.post("question-management/get-list", {
        data: {
          last_id: params.lastId, keysearch: params.keysearch || "",
        },
      });
      const newRows = res.data.data.rows || [];
      setData(prev => isSearch ? newRows : [...prev, ...newRows]);
      setRowTotal(res.data.data.rowTotal || 0);
      setLastId(res.data.data.rows[res.data.data.rows.length - 1]?.last_id || 0);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      setKeywordDebounced(keysearch);
    }, 600);

    return () => {
      clearTimeout(handler);
    };
  }, [keysearch]);

  const changeStatus = async (item: Page) => {
    try {
      const res = await axiosInstance.post("question-management/change-status", {
        data: { id: item.id },
      });
      const newStatus = res.data.data.rows.status;
      const newUpdateTime = res.data.data.rows.update_time;
      setData((prev) =>
        prev.map((p) =>
          p.id === item.id ? { ...p, status: newStatus, update_time: newUpdateTime } : p
        )
      );
      const errorMessage = res.data.error_cont;
      toast.success(errorMessage);
    } catch (error) {
      console.error(error);
    }
  };

  const changePin = async (item: Page) => {
    try {
      const res = await axiosInstance.post("question-management/change-pin", {
        data: { id: item.id },
      });
      const newPin = res.data.data.rows.pin;
      const newUpdateTime = res.data.data.rows.update_time;
      setData((prev) =>
        prev.map((p) =>
          p.id === item.id ? { ...p, pin: newPin, update_time: newUpdateTime } : p
        )
      );
      const errorMessage = res.data.error_cont;
      toast.success(errorMessage);
    } catch (error) {
      console.error(error);
    }
  };

  const confirmDelete = async () => {
    if (!selectedItem) return;
    try {
      const res = await axiosInstance.post("question-management/delete", {
        data: { id: selectedItem.id },
      });

      const deletedId = res.data.data.rows.id;
      setData((prev) => prev.filter((item) => item.id !== deletedId));
      setRowTotal((prev) => {
        if (typeof prev !== 'number') return 0;
        return prev - 1;
      });
      const errorMessage = res.data.error_cont;
      toast.success(errorMessage);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <ComponentTable
          title="questionManagement"
          cols={cols}
          href=''
          data={data}
          showAction={false}
          showMdEmail={false}
          rowTotal={rowTotal}
          showChangeStatusAction={true}
          showPinAction={true}
          showUpdateAction={true}
          showDeleteAction={true}
          onAction={handleAction}
          statusMap={{ 0: "Inactive", 1: "Active" }}
          searchValue={keysearch}
          onSearchChange={(val) => {
            setKeyword(val);
          }}
        />
      )}
      <ConfirmDelete
        isOpen={isConfirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        message={
          <>
            Bạn có chắc chắn muốn xóa trang{" "}
            <strong>{selectedItem?.name}</strong>?
          </>
        }
      />
      <AddButton href="/admin/question-management/process" />
    </div>
  );
}
