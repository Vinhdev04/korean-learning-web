"use client";
import React from "react";
import { Dialog } from "@headlessui/react";

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message?: React.ReactNode;
    title?: string;
    confirmText?: string;
    cancelText?: string;
}

export default function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    message = "Bạn có chắc chắn muốn thực hiện thao tác này?",
    title = "Xác nhận",
    confirmText = "Xác nhận",
    cancelText = "Hủy",
}: ConfirmDialogProps) {
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-999999">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
                    <Dialog.Title className="text-lg font-semibold text-gray-800 dark:text-white">
                        {title}
                    </Dialog.Title>
                    <Dialog.Description className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        {message}
                    </Dialog.Description>
                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                        >
                            {confirmText}
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}
