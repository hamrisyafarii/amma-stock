import {
    Dialog,
    Transition,
    TransitionChild,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

const TambahStokModal = ({ isOpen, onClose, daftarGudang }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        gudang_id: "",
        kuantitas: "",
        satuan: "",
    });

    const handleGudangChange = (e) => {
        const selectedGudangId = e.target.value;
        const selectedGudang = daftarGudang.find(
            (g) => g.id == selectedGudangId
        );

        setData("gudang_id", selectedGudangId);
        setData("kuantitas", "");
        setData("satuan", "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("gudang.stok.masuk"), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <DialogTitle
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Tambah Stok Bahan Baku
                                </DialogTitle>
                                <form
                                    onSubmit={handleSubmit}
                                    className="mt-4 space-y-4"
                                >
                                    <div>
                                        <InputLabel
                                            htmlFor="gudang_id"
                                            value="Nama Bahan Baku"
                                        />
                                        <select
                                            id="gudang_id"
                                            name="gudang_id"
                                            value={data.gudang_id}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                                            onChange={handleGudangChange}
                                            required
                                        >
                                            <option value="">
                                                -- Pilih Bahan Baku --
                                            </option>
                                            {daftarGudang.map((gudang) => (
                                                <option
                                                    key={gudang.id}
                                                    value={gudang.id}
                                                >
                                                    {gudang.nama}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={errors.gudang_id}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="kuantitas"
                                            value="Kuantitas"
                                        />
                                        <TextInput
                                            id="kuantitas"
                                            name="kuantitas"
                                            type="number"
                                            value={data.kuantitas}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    "kuantitas",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.kuantitas}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="satuan"
                                            value="Satuan"
                                        />
                                        <TextInput
                                            id="satuan"
                                            name="satuan"
                                            type="text"
                                            value={data.satuan}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    "satuan",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Contoh: kg, gram, pcs"
                                            required
                                        />
                                        <InputError
                                            message={errors.satuan}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mt-6 flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={onClose}
                                        >
                                            Batal
                                        </button>
                                        <PrimaryButton disabled={processing}>
                                            {processing
                                                ? "Menyimpan..."
                                                : "Simpan"}
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default TambahStokModal;
