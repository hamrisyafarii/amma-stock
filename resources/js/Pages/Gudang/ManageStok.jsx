import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

const ManageStok = ({ daftarGudang }) => {
    const [editingId, setEditingId] = useState(null);

    const { data, setData, put, processing, errors, reset } = useForm({
        kuantitas: "",
        satuan: "",
    });

    const handleEdit = (gudang) => {
        setEditingId(gudang.id);
        setData({
            kuantitas: gudang.kuantitas || "",
            satuan: gudang.satuan || "",
        });
    };

    const handleCancel = () => {
        setEditingId(null);
        reset();
    };

    const handleSubmit = (id) => {
        put(route("gudang.stok.update", id), {
            onSuccess: () => {
                setEditingId(null);
                reset();
            },
        });
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
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nama Bahan Baku
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Kuantitas
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Satuan
                                        </th>
                                        <th className="relative px-6 py-3">
                                            <span className="sr-only">
                                                Aksi
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {daftarGudang.map((gudang) => (
                                        <tr key={gudang.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {gudang.nama}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {editingId === gudang.id ? (
                                                    <>
                                                        <TextInput
                                                            type="number"
                                                            value={
                                                                data.kuantitas
                                                            }
                                                            className="mt-1 block w-full"
                                                            onChange={(e) =>
                                                                setData(
                                                                    "kuantitas",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.kuantitas
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </>
                                                ) : (
                                                    <span className="text-sm text-gray-500">
                                                        {gudang.kuantitas ??
                                                            "-"}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {editingId === gudang.id ? (
                                                    <>
                                                        <TextInput
                                                            value={data.satuan}
                                                            className="mt-1 block w-full"
                                                            onChange={(e) =>
                                                                setData(
                                                                    "satuan",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.satuan
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </>
                                                ) : (
                                                    <span className="text-sm text-gray-500">
                                                        {gudang.satuan ?? "-"}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                {editingId === gudang.id ? (
                                                    <div className="space-x-2">
                                                        <PrimaryButton
                                                            onClick={() =>
                                                                handleSubmit(
                                                                    gudang.id
                                                                )
                                                            }
                                                            disabled={
                                                                processing
                                                            }
                                                        >
                                                            Simpan
                                                        </PrimaryButton>
                                                        <button
                                                            onClick={
                                                                handleCancel
                                                            }
                                                            className="..."
                                                        >
                                                            Batal
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(gudang)
                                                        }
                                                        className="text-amber-600 hover:text-amber-900"
                                                    >
                                                        Edit Stok
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ManageStok;
