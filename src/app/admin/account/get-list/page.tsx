"use client";
import ConfirmDelete from "@/components/tables/ConfirmDelete";
import ComponentTable from "@/components/tables/Table";
import Spinner from "@/components/ui/Spinner";
import axiosInstance from "@/core/hooks/useAxiosService";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { crypto } from "@/lib/index";
import AddButton from "@/components/button/add-button";

interface FormDataItem {
  id: number;
  name: string;
  avatar: string;
  email: string;
  status: string;
  phone: string;
  create_time: string;
  permission_level: string;
}

const cols = [
  { title: "index", field: "index", type: "index", show: true, sort: true },
  { title: "name", field: "name", show: true, sort: false },
  { title: "email", field: "email", show: true, sort: true },
  { title: "status", field: "status", type: "status", show: true, sort: false },
  { title: "phone", field: "phone", show: true, sort: true },
  { title: "createTime", field: "create_time", show: true, sort: false, type: "date", },
  { title: "permissionLevel", field: "permission_level", type: "permissionLevel", show: true, sort: false },
  { title: "lblAction", field: "action", type: "action", show: true, sort: false, },
];

export default function GetList() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<FormDataItem[]>([]);
  const [rowTotal, setRowTotal] = useState<number>();
  const [lastId, setLastId] = useState<string>("999999999999999");
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FormDataItem | null>(null);
  const [keysearch, setKeyword] = useState("");

  const [keywordDebounced, setKeywordDebounced] = useState("");

  useEffect(() => {
    document.title = "Account";
    const fetchData = async () => {
      await getList({ lastId: "999999999999999", keysearch: keywordDebounced }, true);
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywordDebounced]);

  // Hàm xử lý hành động
  const handleAction = (action: string, item: FormDataItem) => {
    switch (action) {
      case "delete":
        setSelectedItem(item);
        setConfirmOpen(true);
        break;
      case "update":
        const encryptedId = crypto.encrypt(item.id.toString());
        router.push(`/admin/account/process?id=${encryptedId}`);
        break;
      case "change-status":
        changeStatus(item);
        break;
      case "pagination":
        getList();
      default:
        console.warn(`Unknown action: ${action}`);
    }
  };
  const getList = async (
    params = { lastId, keysearch },
    isSearch = false,
    showLoading = false
  ) => {
    try {
      if (showLoading) setLoading(true);
      const res = await axiosInstance.post("account/get-list", {
        data: {
          last_id: params.lastId,
          keysearch: params.keysearch || "",
        },
      });
      const rows = res.data.data.rows || [];
      setData(isSearch ? rows : [...data, ...rows]);
      setRowTotal(res.data.data.rowTotal || 0);
      setLastId(rows.length ? rows[rows.length - 1]?.last_id : "0");
    } catch (error) {
      console.error(error);
    } finally {
      if (showLoading) setLoading(false);
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

  const changeStatus = async (item: FormDataItem) => {
    try {
      const res = await axiosInstance.post("account/change-status", {
        data: { id: item.id },
      });
      const newStatus = res.data.data.rows.status;
      setData((prev) =>
        prev.map((p) =>
          p.id === item.id ? { ...p, status: newStatus } : p
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
      const res = await axiosInstance.post("account/delete", {
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
          title="account"
          href=''
          cols={cols}
          data={data}
          showAction={false}
          showMdEmail={false}
          rowTotal={rowTotal}
          showChangeStatusAction={true}
          showPinAction={false}
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
            Bạn có chắc chắn muốn xóa tài khoản{" "}
            <strong>{selectedItem?.name}</strong>?
          </>
        }
      />
      <AddButton href="/admin/account/process" />
    </div>
  );
}
