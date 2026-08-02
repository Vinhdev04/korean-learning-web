'use client';
import React from 'react';
import { MdEmail } from 'react-icons/md';

// import Image from "next/image";
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table';
import Badge from '../ui/badge/Badge';
import Button from '../ui/button/Button';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { useTranslations } from 'next-intl';
import { formatCurrency, DateUtils } from '@/lib/index';
import { MdModeEdit, MdNavigateNext } from 'react-icons/md';
import { FaRegEye, FaTrash } from 'react-icons/fa6';
import { GrStatusGoodSmall } from 'react-icons/gr';
import { TiPin } from 'react-icons/ti';
import { formatNumber } from '@/lib/formatNumber';
import SearchInput from '../search/SearchInput';
import { RiInformationLine } from 'react-icons/ri';
import ArrowButton from '../button/arrowButton';

interface TableProps<T = Record<string, unknown>> {
  title: string;
  cols: ColsTable[];
  href: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>[];
  keysRow?: string;
  rowTotal?: number;
  onAction: (action: string, item: T) => void;
  showUpdateAction?: boolean;
  showDeleteAction?: boolean;
  showAction?: boolean;
  showPinAction?: boolean;
  showChangeStatusAction?: boolean;
  showPopup?: boolean;
  showMdEmail?: boolean;
  statusMap?: { [key: number]: string };
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  // Optional extra controls to render next to the search input in the header
  extraHeaderControls?: React.ReactNode;
  statusTypeMap?: { [key: number]: string }
}

export type ColsTable = {
  title: string;
  field: string;
  show: boolean;
  sort: boolean;
  className?: string;
  type?:
    | string
    | 'index'
    | 'action'
    | 'money'
    | 'currency'
    | 'number'
    | 'status'
    | 'date'
    | 'time'
    | 'datetime'
    | 'checkbox'
    | 'file'
    | 'link'
    | 'translations'
    | 'sort'
    | 'type_template';
};

function ComponentTable<T = Record<string, unknown>>({
  title = '',
  href = '',
  cols,
  data,
  rowTotal = 0,
  keysRow = 'id',
  onAction,
  showAction = false,
  showPinAction = false,
  showUpdateAction = false,
  showDeleteAction = false,
  showChangeStatusAction = false,
  showMdEmail = false,
  showPopup = false,
  statusMap = {},
  statusTypeMap = {},
  searchValue,
  onSearchChange,
  extraHeaderControls,
}: TableProps<T>) {
  const t = useTranslations();
  return (
    <div>
      <div className="flex justify-between items-center">
        {title != '' && (
          <h2
            className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-4"
            x-text="pageName"
          >
            {t(title)}
          </h2>
        )}
        {(onSearchChange || extraHeaderControls) && (
          <div className="flex items-center gap-2">
            {extraHeaderControls}
            {onSearchChange && (
              <div className="border-b border-gray-100 dark:border-white/[0.05]">
                <SearchInput value={searchValue || ''} onChange={onSearchChange} />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {cols.map((col, idx) => (
                  <TableCell
                    key={col.field ? String(col.field) : `col-${idx}`}
                    isHeader
                    className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                  >
                    {t(col.title ?? '', { defaultMessage: col.title ?? '' })}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data.map((item, index) => (
                <TableRow
                  key={`${item[keysRow]}-${index}`}
                  className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-white/[0.03]' : 'dark:hover:bg-white/[0.03]'}`}
                >
                  {cols.map((col, idx) =>
                    col.show ? (
                      <TableCell
                        key={col.field ? String(col.field) : `col-${idx}`}
                        className={`text-theme-sm px-5 py-3 text-start dark:text-gray-400 max-w-[400px] min-w-[80px] ${col.className || ''}`}
                      >
                        {(() => {
                          switch (col.type) {
                            case 'index':
                              return index + 1;
                            case 'sort':
                              return (
                                <button
                                  type="button"
                                  onClick={() => onAction('quick-edit-sort', item as T)}
                                  className="text-blue-600 hover:underline cursor-pointer"
                                >
                                  {item[col.field] ?? ''}
                                </button>
                              );
                            case 'images':
                              return (
                                <div className="overflow-hidden relative">
                                  <img
                                    className="h-[40px] object-contain"
                                    src={
                                      item.image
                                        ? `${item.image}`
                                        : `${process.env.NEXT_PUBLIC_API_BASE_URL}public/uploads/library/multimedia-1750927514082-671447238.png`
                                    }
                                    alt={item.name}
                                  />
                                </div>
                              );
                            case 'money':
                              return formatCurrency(item[col.field]);
                            case 'date':
                              return DateUtils.formatDate(
                                item[col.field],
                                'YYYYMMDDHHmmss',
                                'DD/MM/YYYY HH:mm:ss'
                              );
                            case 'number':
                              return formatNumber(item[col.field]);
                            case 'status':
                              const statusText = statusMap?.[item.status];
                              return (
                                <Badge
                                  size="sm"
                                  color={item.status === '1' ? 'success' : 'warning'}
                                >
                                  {statusText}
                                </Badge>
                              );
                            case 'type_template':
                              const typeTemplateText = statusTypeMap?.[item.type];
                              return (
                                <Badge
                                  size="sm"
                                  color={item.status === '1' ? 'success' : 'warning'}
                                >
                                  {typeTemplateText}
                                </Badge>
                              );
                            case 'permissionLevel':
                              const permissionLevel = String(item.permission_level);
                              return (
                                <span
                                  className={`${
                                    permissionLevel === '1' ? 'text-green-500' : 'text-green-500'
                                  }`}
                                >
                                  {permissionLevel === '1' ? 'Admin' : 'User'}
                                </span>
                              );
                            case 'translations':
                              const translations = item.translations || [];
                              return (
                                <Badge
                                  size="sm"
                                  color={translations.length > 0 ? 'success' : 'warning'}
                                >
                                  {translations.length > 0 ? `${translations}` : 'Chưa có bản dịch'}
                                </Badge>
                              );
                            case 'action':
                              return (
                                <div className="flex gap-4">
                                  {showUpdateAction && (
                                    <button
                                      onClick={() => onAction('update', item as T)}
                                      className="text-blue-500"
                                    >
                                      <MdModeEdit className="text-2xl" />
                                    </button>
                                  )}
                                  {showMdEmail && (
                                    <button
                                      onClick={() => onAction('update', item as T)}
                                      className="text-blue-500"
                                    >
                                      {item.status === '0' ? (
                                        <MdEmail className="text-2xl" />
                                      ) : (
                                        <HiOutlineMailOpen className="text-2xl" />
                                      )}
                                    </button>
                                  )}

                                  {showChangeStatusAction && (
                                    <button
                                      onClick={() => onAction('change-status', item as T)}
                                      className={
                                        item.status === '1' ? 'text-green-500' : 'text-red-500'
                                      }
                                    >
                                      <GrStatusGoodSmall className="text-1xl" />
                                    </button>
                                  )}

                                  {showPinAction && (
                                    <button
                                      onClick={() => onAction('change-pin', item as T)}
                                      className={
                                        item.pin === '1' ? 'text-green-500' : 'text-red-500'
                                      }
                                    >
                                      <div className="relative group inline-block cursor-pointer">
                                        <TiPin className="text-2xl " />
                                        {/* 
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-max px-2 py-0.5 text-xs text-white bg-gray-800 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                          Ghim để lên trang chủ
                                        </div> */}
                                      </div>
                                    </button>
                                  )}

                                  {showAction && (
                                    <button
                                      onClick={() => onAction('change-show', item as T)}
                                      className={
                                        item.show === '1' ? 'text-green-500' : 'text-red-500'
                                      }
                                    >
                                      <div className="relative group inline-block cursor-pointer">
                                        <RiInformationLine className="text-xl " />
                                      </div>
                                    </button>
                                  )}

                                  {showDeleteAction &&
                                    (item.hasOwnProperty('static') ? (
                                      item.static === '0' ? (
                                        <button
                                          onClick={() => onAction('delete', item as T)}
                                          className="text-red-500"
                                        >
                                          <FaTrash className="text-1xl" />
                                        </button>
                                      ) : (
                                        <button
                                          disabled
                                          className="cursor-not-allowed text-gray-400"
                                        >
                                          <FaTrash className="text-1xl" />
                                        </button>
                                      )
                                    ) : (
                                      <button
                                        onClick={() => onAction('delete', item as T)}
                                        className="text-red-500"
                                      >
                                        <FaTrash className="text-1xl" />
                                      </button>
                                    ))}
                                  {showPopup && (
                                    <button
                                      onClick={() => onAction('pop-up', item as T)}
                                      className="relative group inline-block cursor-pointer"
                                    >
                                      <FaRegEye className="text-xl text-blue-500" />
                                    </button>
                                  )}
                                </div>
                              );

                            // Thêm các case khác nếu cần
                            default:
                              return <p className="line-clamp-2">{item[col.field] || ''}</p>;
                          }
                        })()}
                      </TableCell>
                    ) : null
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div key="Pagination" className="max-w-full bg-gray-50 px-5 py-2 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              {/* Pagination bên trái */}
              <div className="flex items-center gap-2">
                <span className="text-theme-sm dark:text-gray-400">
                  {t('total')}: {data.length || 0} / {rowTotal || 0}
                </span>
                <Button
                  variant="icon"
                  size="sm"
                  onClick={() => onAction('pagination', {} as T)}
                  disabled={rowTotal === 0 || rowTotal === data.length}
                >
                  <MdNavigateNext className="text-2xl dark:text-gray-400" />
                </Button>
              </div>
              {href && <ArrowButton href={href} className="" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComponentTable;
