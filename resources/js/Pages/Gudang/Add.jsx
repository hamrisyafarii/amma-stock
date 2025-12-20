import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const Add = () => {
    const { data, setData, post, processing, errors } = useForm({
        nama: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("gudang.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route("gudang.index")}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <ArrowLeftIcon className="h-5 w-5" />
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Tambah Master Bahan Baku
                    </h2>
                </div>
            }
        >
            <Head title="Tambah Bahan Baku - Amma Coffe" />

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
                                    name="nama"
                                    value={data.nama}
                                    className="mt-1 block w-full"
                                    autoComplete="nama"
                                    isFocused={true}
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
                                    className="inline-flex items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-gray-800 uppercase tracking-widest hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition ease-in-out duration-150"
                                >
                                    Batal
                                </Link>
                                <PrimaryButton
                                    className="bg-amber-600 hover:bg-amber-700 focus:bg-amber-700"
                                    disabled={processing}
                                >
                                    {processing ? "Menyimpan..." : "Simpan"}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Add;
