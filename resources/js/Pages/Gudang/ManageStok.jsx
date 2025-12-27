import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { Head } from "@inertiajs/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import PrimaryButton from "@/Components/PrimaryButton";
import TambahStokModal from "@/Components/TambahStokModal";

const ManageStok = ({ daftarGudang }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const hitungStokAkhir = (gudang) => {
        const stokMasuk =
            gudang.stok_mutasis
                ?.filter((m) => m.tipe === "masuk")
                .reduce((sum, item) => sum + item.kuantitas, 0) || 0;
        const stokKeluar =
            gudang.stok_mutasis
                ?.filter((m) => m.tipe === "keluar")
                .reduce((sum, item) => sum + item.kuantitas, 0) || 0;
        return stokMasuk - stokKeluar;
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Kelola Stok Bahan Baku
                </h2>
            }
        >
            <Head title="Kelola Stok - Amma Coffee" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm rounded-lg">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-900">
                                Daftar Stok Bahan Baku
                            </h3>
                            <PrimaryButton
                                onClick={openModal}
                                className="bg-amber-600 hover:bg-amber-700"
                            >
                                <PlusIcon className="h-4 w-4 mr-2" />
                                Tambah Stok
                            </PrimaryButton>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nama Bahan Baku
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Satuan
                                        </th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Stok Tersedia
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {daftarGudang.map((gudang) => (
                                        <tr key={gudang.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {gudang.nama}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {gudang.satuan}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <span
                                                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        hitungStokAkhir(
                                                            gudang
                                                        ) > 10
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-red-100 text-red-800"
                                                    }`}
                                                >
                                                    {hitungStokAkhir(gudang)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <TambahStokModal
                isOpen={isModalOpen}
                onClose={closeModal}
                daftarGudang={daftarGudang}
            />
        </AuthenticatedLayout>
    );
};

export default ManageStok;
