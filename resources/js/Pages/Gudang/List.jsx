import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, router, usePage } from "@inertiajs/react";
import React from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const List = () => {
    const { daftarGudang } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            router.delete(route("gudang.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Manajemen Bahan Baku
                    </h2>
                    <div className="text-sm text-gray-500">
                        Total {daftarGudang.length} item
                    </div>
                </div>
            }
        >
            <div className="bg-white shadow-sm rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">
                        Daftar Stok Bahan Baku
                    </h3>
                    <Link
                        href={route("gudang.create")}
                        className="inline-flex items-center px-4 py-2 bg-amber-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-amber-700 focus:bg-amber-700 active:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Tambah Bahan Baku
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Nama Bahan Baku
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Kuantitas
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Satuan
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Aksi</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {daftarGudang.length > 0 ? (
                                daftarGudang.map((gudang) => (
                                    <tr
                                        key={gudang.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {gudang.nama}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {gudang.kuantitas !== null &&
                                            gudang.satuan ? (
                                                <span
                                                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800`}
                                                >
                                                    {gudang.kuantitas}
                                                </span>
                                            ) : (
                                                <span className="text-gray-400 italic">
                                                    Stok belum diatur
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {gudang.satuan || "-"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                            <Link
                                                href={route(
                                                    "gudang.edit",
                                                    gudang.id
                                                )}
                                                className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                                            >
                                                <PencilIcon className="h-4 w-4 mr-1" />
                                                Edit
                                            </Link>

                                            <button
                                                onClick={() =>
                                                    handleDelete(gudang.id)
                                                }
                                                className="text-red-600 hover:text-red-900 inline-flex items-center"
                                            >
                                                <TrashIcon className="h-4 w-4 mr-1" />{" "}
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="px-6 py-12 text-center"
                                    >
                                        <div className="text-gray-500">
                                            <svg
                                                className="mx-auto h-12 w-12 text-gray-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                                />
                                            </svg>
                                            <p className="mt-2">
                                                Tidak ada data stok barang.
                                            </p>
                                            <p className="text-sm">
                                                Mulai dengan menambah barang
                                                baru.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default List;
