import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const Update = ({ gudang }) => {
    const { data, setData, put, processing, errors } = useForm({
        nama: gudang.nama,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("gudang.update", gudang.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route("gudang.index")}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <ArrowLeftIcon className="h-5 w-5" />
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Edit Nama Bahan Baku
                    </h2>
                </div>
            }
        >
            <Head title={`Edit Nama: ${gudang.nama} - Amma Coffee`} />

            <div className="py-8">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <InputLabel
                                    htmlFor="nama"
                                    value="Nama Bahan Baku"
                                />
                                <TextInput
                                    id="nama"
                                    value={data.nama}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("nama", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.nama}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <Link
                                    href={route("gudang.index")}
                                    className="..."
                                >
                                    Batal
                                </Link>
                                <PrimaryButton disabled={processing}>
                                    {processing
                                        ? "Menyimpan..."
                                        : "Perbarui Nama"}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Update;
