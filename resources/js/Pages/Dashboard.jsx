import { Head, Link, router } from "@inertiajs/react";
import {
    Activity,
    BookOpen,
    CalendarDays,
    CheckCircle2,
    ChevronDown,
    FileDown,
    HeartHandshake,
    LogOut,
    MapPin,
    Phone,
    RotateCcwClock,
    School,
    Sparkles,
    WalletCards,
    X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
    formatDate,
    formatHonorificName,
    formatMoney,
    formatTeacherName,
    getInitials,
} from "../../utils/formatter";

export default function Dashboard({
    guardian,
    studentsList,
    selectedStudent,
    lastPaid,
    unpaidInvoices,
    paidInvoices,
    totalUnpaid,
}) {
    // Nilai: null | profile | pay_now | history_payment
    const [activePopup, setActivePopup] = useState(null);
    const [copied, setCopied] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [showStudentList, setShowStudentList] = useState(false);

    const profileRef = useRef(null);
    const textRef = useRef(null);
    const selectStudentRef = useRef(null);

    async function copyToClipboard() {
        if (textRef.current) {
            await navigator.clipboard.writeText(textRef.current.innerText);

            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }

    function handleSelectStudent(studentId) {
        setActivePopup(null);
        router.get(route("dashboard", { student_id: studentId }));
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                activePopup === "profile" &&
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setActivePopup(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [activePopup]);

    useEffect(() => {
        function handleCLoseModal(e) {
            if (e.key === "Escape") {
                setActivePopup(null);
            }
        }

        document.addEventListener("keydown", handleCLoseModal);
        return () => document.removeEventListener("keydown", handleCLoseModal);
    }, []);

    if (!selectedStudent || studentsList.length === 0) {
        return (
            <div className="min-h-screen bg-[#F8F7F3] flex justify-center items-center">
                <div className="bg-white max-w-md w-full p-8 border border-slate-300 rounded-3xl text-center shadow-lg">
                    <div className="h-14 w-14 mx-auto bg-emerald-100 text-emerald-800 rounded-full flex justify-center items-center mb-4">
                        <School size={32} />
                    </div>

                    <h2 className="text-xl font-bold font-display mb-2 text-emerald-950">
                        Data Murid Belum Ditautkan
                    </h2>
                    <p className="text-xs text-slate-600 leading-relaxed mb-6">
                        Akun Anda <strong>{guardian.name}</strong> belum
                        terhubung dengan profil siswa manapun di SDIT BISA
                        BOGOR. Silakan hubungi bagian Tata Usaha / Admin Sekolah
                    </p>

                    <a
                        href="https://wa.me/6285947478876"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex justify-center items-center w-full px-4 py-2.5 bg-emerald-800 text-white rounded-xl text-xs font-semibold hover:bg-emerald-900 transition-all duration-200"
                    >
                        Hubungi Admin Sekolah (WhatsApp)
                    </a>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head title="Dashboard" />

            <div className="min-h-screen bg-[#F8F7F3] font-sans select-none">
                <nav className="sticky top-0 bg-white z-99 border-b border-slate-300">
                    <div className="sm:max-w-7xl mx-auto py-2 px-2 sm:px-6 flex items-center gap-2 justify-between">
                        <div className="flex items-start gap-2">
                            <div className="bg-emerald-800 text-emerald-50 p-2 rounded-xl">
                                <School size={32} />
                            </div>
                            <div>
                                <span className="font-sans sm:text-lg text-emerald-800 font-bold block tracking-tight leading-4.5">
                                    SDIT BISA BOGOR
                                </span>
                                <p className="text-sm opacity-70">
                                    Portal Orang Tua
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-4">
                            <div
                                ref={profileRef}
                                className="relative flex gap-2 bg-emerald-50 px-2 py-1.5 rounded-xl hover:bg-[#d4e3dc] cursor-pointer duration-200"
                                onClick={() =>
                                    setActivePopup(
                                        activePopup === "profile"
                                            ? null
                                            : "profile",
                                    )
                                }
                            >
                                <div className="h-12 w-12 border border-slate-300 rounded-full overflow-hidden">
                                    <img
                                        src="https://placehold.co/400"
                                        alt=""
                                    />
                                </div>
                                <div className="max-w-35 text-left hidden sm:block">
                                    <span className="text-sm font-bold tracking-tight truncate">
                                        {guardian.gender === "Laki-laki"
                                            ? "Abu"
                                            : "Ummu"}{" "}
                                        {guardian.name}
                                    </span>
                                    <div className="flex items-center gap-2 bg-emerald-300 py-0.5 px-1.5 rounded-lg text-emerald-800">
                                        <p className="text-xs font-bold truncate">
                                            {selectedStudent.full_name} (
                                            {selectedStudent.class_name})
                                        </p>
                                        <ChevronDown size={18} className={`transition-all duration-300 ${activePopup === 'profile' ? '-rotate-180' : ''}`} />
                                    </div>
                                </div>
                                {activePopup === "profile" && (
                                    <div
                                        className="animate-in slide-in-from-top-10 fade-in-50 transition-all duration-300 p-4 bg-emerald-50 border border-slate-200 shadow-xl rounded-lg absolute top-[105%] -right-4 sm:right-0 w-screen sm:w-72"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="flex sm:hidden gap-3 mb-2">
                                            <div className="bg-emerald-800 h-12 w-12 flex items-center justify-center rounded-full font-display text-sm font-bold text-emerald-100 shadow-sm mb-2">
                                                {getInitials(
                                                    selectedStudent.full_name,
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-sm">{guardian.name}</h4>
                                                <p className="text-sm text-slate-500">{guardian.phone}</p>
                                            </div>
                                        </div>
                                        <div
                                            className={`flex justify-between items-center px-2 py-1.5 bg-emerald-300 rounded-lg text-emerald-950 cursor-pointer ${
                                                showStudentList
                                                    ? "rounded-b-none"
                                                    : "rounded-b-lg"
                                            }`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowStudentList(
                                                    !showStudentList,
                                                );
                                            }}
                                        >
                                            <h4 className="font-bold text-sm">
                                                Pilih Anak
                                            </h4>
                                            <ChevronDown size={18} className={`transition-all duration-300 ${showStudentList && '-rotate-180'}`} />
                                        </div>
                                        {showStudentList && (
                                            <ul className="animate-in fade-in slide-in-from-top-5 duration-200 bg-emerald-200 text-emerald-800 rounded-xl rounded-t-none divide-y divide-slate-100/50 overflow-hidden text-left">
                                                {studentsList.map((student) => (
                                                    <li
                                                        key={student.id}
                                                        className="text-sm font-bold tracking-tight p-2 truncate hover:bg-emerald-50 hover:text-emerald-800 cursor-pointer"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleSelectStudent(
                                                                student.id,
                                                            );
                                                        }}
                                                    >
                                                        {student.full_name} (
                                                        {student.class_name})
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        <div className="block sm:hidden pt-2 mt-4 border-t-2 border-slate-200">
                                            <Link
                                                href={route("logout")}
                                                method="post"
                                                className="h-fit w-full flex items-center gap-2 bg-rose-50 text-rose-800 px-3 py-1.5 text-sm rounded-xl cursor-pointer shadow-sm font-semibold duration-200 hover:bg-rose-100 active:scale-95 justify-center"
                                            >
                                                <LogOut
                                                    size={16}
                                                    strokeWidth={3}
                                                    className="rotate-180"
                                                />{" "}
                                                Keluar
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <Link
                                href={route("logout")}
                                method="post"
                                className="hidden h-fit sm:flex items-center gap-2 bg-rose-50 text-rose-800 px-3 py-1.5 text-sm rounded-xl cursor-pointer shadow-sm font-semibold duration-200 hover:bg-rose-100 active:scale-95 w-full sm:w-fit justify-center"
                            >
                                <LogOut
                                    size={16}
                                    strokeWidth={3}
                                    className="rotate-180"
                                />{" "}
                                Keluar
                            </Link>
                        </div>
                    </div>
                </nav>

                <main className="max-w-7xl mx-auto py-8 px-3 sm:px-6">
                    <section className="mb-5">
                        <p className="text-xs font-semibold mb-1 text-emerald-900/70">
                            {formatDate(new Date(), "dayMonth")}
                        </p>
                        <h1 className="font-display text-emerald-900 text-4xl font-bold tracking-tighter mb-3">
                            Halo,{" "}
                            {formatHonorificName(
                                guardian.name,
                                guardian.gender,
                            )}
                            .
                        </h1>
                        <p className="text-sm opacity-70 max-w-2xl">
                            Berikut kabar terbaru dari perjalanan sekolah{" "}
                            <span className="font-sans text-emerald-900 font-bold">
                                {selectedStudent.full_name}
                            </span>
                            .
                        </p>
                    </section>

                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[.82fr_1.18fr]">
                        <section className="bg-white shadow-md p-6 border border-slate-300 rounded-3xl">
                            <div className="flex justify-between mb-4">
                                <div>
                                    <p className="text-[10px] opacity-60 font-semibold tracking-wide -mb-1">
                                        PROFIL SISWA
                                    </p>
                                    <h2 className="text-lg text-emerald-900 font-display font-bold">
                                        Informasi Lengkap Siswa
                                    </h2>
                                </div>
                                <div className="bg-emerald-50 p-2 rounded-full h-fit">
                                    <School
                                        size={20}
                                        className="text-emerald-800"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col items-center mb-5">
                                <div className="bg-emerald-800 h-25 w-25 flex items-center justify-center rounded-full font-display text-4xl font-bold text-emerald-100 shadow-sm mb-2">
                                    {getInitials(selectedStudent.full_name)}
                                </div>
                                <h2 className="text-2xl text-center text-emerald-900 font-display tracking-tight font-bold">
                                    {selectedStudent.full_name}
                                </h2>
                                <div className="flex items-center gap-x-6 text-xs">
                                    <div className="flex items-center gap-x-1.5">
                                        <BookOpen
                                            size={12}
                                            className="opacity-70"
                                        />
                                        <span className="font-bold text-emerald-800">
                                            {selectedStudent.class_name}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-x-1.5">
                                        <span className="text-xs opacity-70">
                                            NISN
                                        </span>
                                        <p className="font-bold text-emerald-800">
                                            {selectedStudent.nisn}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex gap-4">
                                    <div className="p-2 bg-emerald-50 rounded-full h-fit">
                                        <MapPin className="text-emerald-800/70" />
                                    </div>
                                    <div>
                                        <span className="text-xs opacity-70 block">
                                            Alamat
                                        </span>
                                        <p className="text-sm font-bold text-emerald-800">
                                            {selectedStudent.address}
                                        </p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="p-2 bg-emerald-50 rounded-full h-fit">
                                        <CalendarDays className="text-emerald-800/70" />
                                    </div>
                                    <div>
                                        <span className="text-xs opacity-70 block">
                                            Tempat, Tanggal Lahir
                                        </span>
                                        <p className="text-sm font-bold text-emerald-800">
                                            {selectedStudent.birth_place},{" "}
                                            {formatDate(
                                                selectedStudent.birth_date,
                                                "short",
                                            )}
                                        </p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="p-2 bg-emerald-50 rounded-full h-fit">
                                        <HeartHandshake className="text-emerald-800/70" />
                                    </div>
                                    <div>
                                        <span className="text-xs opacity-70 block">
                                            Jenis Kelamin
                                        </span>
                                        <p className="text-sm font-bold text-emerald-800">
                                            {selectedStudent.gender}
                                        </p>
                                    </div>
                                </li>
                            </ul>
                            <div className="mt-5 pt-5 border-t border-slate-200">
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <span className="text-xs opacity-70 mb-1 block">
                                            Wali Kelas
                                        </span>
                                        <p className="text-xs font-bold text-emerald-800">
                                            {formatTeacherName(
                                                selectedStudent.homeroom_teacher
                                                    .name,
                                                selectedStudent.homeroom_teacher
                                                    .gender,
                                                selectedStudent.homeroom_teacher
                                                    .title,
                                            )}
                                        </p>
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-xs opacity-70 mb-1 block">
                                            Tahun Ajaran
                                        </span>
                                        <p className="text-xs font-bold text-emerald-800">
                                            {selectedStudent.academic_year}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white shadow-md p-6 border border-slate-300 rounded-3xl">
                            <div className="flex justify-between mb-4">
                                <div>
                                    <p className="text-[10px] opacity-60 font-semibold tracking-wide -mb-1">
                                        KEUANGAN
                                    </p>
                                    <h2 className="text-lg text-emerald-900 font-display font-bold">
                                        Tagihan & Pembayaran
                                    </h2>
                                </div>
                                {unpaidInvoices.length > 0 && (
                                    <p className="whitespace-nowrap px-3 h-7 tracking-wide flex justify-center items-center text-[11px] font-bold bg-emerald-50 text-emerald-800 rounded-4xl">
                                        {unpaidInvoices.length} catatan
                                    </p>
                                )}
                            </div>

                            {unpaidInvoices.length > 0 ? (
                                <div className="flex justify-between gap-2 p-4 bg-emerald-900 text-white rounded-2xl">
                                    <div>
                                        <p className="text-[11px] font-bold tracking-wide text-emerald-100/90 mb-2">
                                            TOTAL TUNGGAKAN
                                        </p>
                                        <p className="font-display font-bold text-3xl sm:text-5xl mb-4">
                                            {formatMoney(totalUnpaid)}
                                        </p>
                                        <p className="text-xs sm:text-sm text-emerald-100/90 mb-2">
                                            <span className="font-bold text-white">
                                                {unpaidInvoices.length}{" "}
                                                tagihan{" "}
                                            </span>{" "}
                                            perlu diperhatikan
                                        </p>
                                        {lastPaid && (
                                            <p className="text-xs text-emerald-100/80">
                                                Pembayaran terakhir:{" "}
                                                {formatDate(lastPaid, "short")}
                                            </p>
                                        )}
                                        <button
                                            className="mt-4 px-2.5 py-1 text-xs tracking-wide font-semibold border border-emerald-50 rounded-full hover:bg-emerald-50 hover:text-emerald-800 transition-all duration-200 active:scale-95 cursor-pointer"
                                            onClick={() => {
                                                setActivePopup("pay_now");
                                                setSelectedInvoice({
                                                    amount: totalUnpaid,
                                                });
                                            }}
                                        >
                                            Bayar Semua Tagihan
                                        </button>
                                    </div>
                                    <div className="hidden sm:block bg-emerald-50 text-emerald-800 rounded-full h-fit p-3">
                                        <WalletCards size={20} />
                                    </div>
                                </div>
                            ) : (
                                <div className="p-6 bg-linear-to-br from-emerald-800 to-emerald-950 text-white rounded-2xl border border-emerald-700/50 shadow-sm text-center">
                                    <div className="w-14 h-14 mx-auto mb-3 border-emerald-500/30 flex justify-center items-center bg-emerald-700/60 text-emerald-300 rounded-full">
                                        <CheckCircle2 size={32} />
                                    </div>
                                    <span className="inline-flex items-center gap-1 mb-2 text-xs font-semibold bg-emerald-500/20 px-2.5 py-1 rounded-full text-emerald-200">
                                        <Sparkles size={16} /> Bebas Tunggakan
                                    </span>
                                    <h3 className="text-xl sm:text-2xl font-display font-bold">
                                        Alhamdulillah, Semua Lunas!
                                    </h3>
                                    <p className="text-xs sm:text-sm text-emerald-100/80 max-w-md mx-auto mt-1 leading-relaxed">
                                        Tidak ada kewajiban yang tertunda untuk{" "}
                                        <span className="font-bold text-white">
                                            {selectedStudent.full_name}
                                        </span>
                                        . Jazakumullahu Khairan atas kerja
                                        samanya.
                                    </p>
                                </div>
                            )}

                            <div className="mt-5">
                                {unpaidInvoices.length > 0 ? (
                                    <>
                                        <div className="flex justify-between items-center mb-3">
                                            <h3 className="text-md font-sans tracking-wide text-gray-800/80 font-bold">
                                                Tunggakan Saat Ini
                                            </h3>
                                            <button
                                                className="border-2 border-emerald-800 text-emerald-800 px-2.5 py-1.5 rounded-xl text-xs hover:bg-emerald-800 hover:text-white transition-all duration-200 active:scale-95 cursor-pointer font-bold flex items-center gap-2"
                                                onClick={() =>
                                                    setActivePopup(
                                                        "history_payment",
                                                    )
                                                }
                                            >
                                                <RotateCcwClock size={16} />
                                                <span>Riwayat Pembayaran</span>
                                            </button>
                                        </div>
                                        <div className="w-full overflow-x-auto max-h-85 bg-slate-50/50 rounded-lg shadow-md border border-slate-200">
                                            <table className="w-full min-w-110 max-h-50 text-left text-sm text-gray-600">
                                                <thead className="text-[10px] font-bold uppercase text-gray-700/80 border-b border-slate-200 sticky top-0 bg-slate-200 z-1">
                                                    <tr>
                                                        <th className="ps-2 pt-2 pb-2 tracking-widest w-3/10">
                                                            Rincian
                                                        </th>
                                                        <th className="pt-2 pb-2 tracking-widest pr-8 w-2/10 text-right">
                                                            Nominal
                                                        </th>
                                                        <th className="pt-2 pb-2 tracking-widest w-2/10 text-left">
                                                            Jatuh Tempo
                                                        </th>
                                                        <th className="pt-2 pb-2 tracking-widest w-2/10 text-center">
                                                            Status
                                                        </th>
                                                        <th className="pt-2 pb-2 tracking-widest w-2/10 text-center">
                                                            Aksi
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-200">
                                                    {unpaidInvoices.length >
                                                    0 ? (
                                                        unpaidInvoices.map(
                                                            (invoice) => (
                                                                <tr
                                                                    key={
                                                                        invoice.id
                                                                    }
                                                                    className="hover:bg-slate-100 transition-colors"
                                                                >
                                                                    <td className="ps-2 font-medium text-gray-800 py-4">
                                                                        <p className="font-serif text-sm font-semibold text-emerald-800 mb-1">
                                                                            {
                                                                                invoice.title
                                                                            }
                                                                        </p>
                                                                        <p className="text-xs opacity-70 flex items-center gap-1">
                                                                            <CalendarDays
                                                                                size={
                                                                                    12
                                                                                }
                                                                            />{" "}
                                                                            {formatDate(
                                                                                invoice.created_at,
                                                                            )}
                                                                        </p>
                                                                    </td>
                                                                    <td className="font-serif text-sm font-semibold text-emerald-800 text-right pr-8 py-4">
                                                                        {formatMoney(
                                                                            invoice.amount,
                                                                        )}
                                                                    </td>
                                                                    <td className="py-4">
                                                                        <p className="text-xs opacity-70 flex items-center gap-1">
                                                                            <CalendarDays
                                                                                size={
                                                                                    12
                                                                                }
                                                                            />{" "}
                                                                            {formatDate(
                                                                                invoice.due_date,
                                                                                "short",
                                                                            )}
                                                                        </p>
                                                                    </td>
                                                                    <td className="py-4">
                                                                        <div className="rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-600 flex items-center gap-1.5 w-fit mx-auto">
                                                                            <div className="h-1.5 w-1.5 rounded-full bg-amber-600"></div>
                                                                            <span>
                                                                                Belum
                                                                                Bayar
                                                                            </span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="py-4">
                                                                        <button
                                                                            className="rounded-full bg-emerald-800 px-2 py-1 text-xs font-semibold text-emerald-50 cursor-pointer select-none hover:bg-emerald-900 active:scale-95 duration-200 whitespace-nowrap"
                                                                            onClick={() => {
                                                                                setActivePopup(
                                                                                    "pay_now",
                                                                                );
                                                                                setSelectedInvoice(
                                                                                    invoice,
                                                                                );
                                                                            }}
                                                                        >
                                                                            <span>
                                                                                Bayar
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ),
                                                        )
                                                    ) : (
                                                        <tr className="bg-slate-200/80">
                                                            <td
                                                                colSpan={5}
                                                                className="text-center py-3"
                                                            >
                                                                <span>
                                                                    Tidak Ada
                                                                    Tagihan
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                ) : (
                                    <div className="p-6 rounded-lg border-2 border-dashed border-slate-400 text-center flex flex-col items-center">
                                        <p className="text-xs text-slate-500">
                                            Ingin mengecek kuitansi atau riwayat
                                            pembayaran sebelumnya?
                                        </p>
                                        <button
                                            className="flex gap-2 items-center text-xs px-4 py-2 bg-slate-100 text-slate-800 hover:bg-slate-200 transition-all duration-200 rounded-xl mt-4 cursor-pointer"
                                            onClick={() =>
                                                setActivePopup(
                                                    "history_payment",
                                                )
                                            }
                                        >
                                            <RotateCcwClock size={14} />
                                            <span>
                                                Lihat Riwayat pembayaran
                                            </span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </section>

                        <section className="bg-emerald-50 shadow-md p-6 border border-slate-300 rounded-3xl col-span-1 lg:col-span-2">
                            <div className="flex justify-between">
                                <div>
                                    <div className="flex gap-2 items-center px-3 py-1.5 bg-emerald-200/50 rounded-full w-fit text-emerald-800">
                                        <Activity size={14} />
                                        <span className="text-xs font-semibold tracking-wide">
                                            FITUR YANG AKAN DATANG
                                        </span>
                                    </div>
                                    <h5 className="mt-2 text-2xl font-bold font-display text-emerald-900">
                                        Perjalanan belajar, lebih dekat
                                    </h5>
                                    <p className="text-xs text-emerald-800/80 max-w-md">
                                        Fitur akademik, catatan perkembangan,
                                        dan informasi kelas akan hadir di portal
                                        ini.
                                    </p>
                                </div>
                                <div className="p-4 bg-emerald-100 rounded-xl text-emerald-800 shadow-sm place-self-center">
                                    <BookOpen size={42} />
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>

            {activePopup === "history_payment" && (
                <div
                    className="fixed inset-0 z-2 bg-black/60 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300"
                    onClick={() => setActivePopup(null)}
                >
                    <div
                        className="bg-white border border-slate-300 w-[90vw] lg:w-1/2 max-h-[80vh] rounded-2xl shadow-2xl p-8 relative overflow-hidden animate-in slide-in-from-bottom-10 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-6 flex justify-between">
                            <div>
                                <h3 className="font-bold tracking-tight text-base text-slate-900">
                                    Riwayat Pembayaran
                                </h3>
                                <p className="text-slate-400 text-xs mt-0.5">
                                    Menampilkan daftar pembayaran yang telah
                                    diverifikasi oleh Bendahara Sekolah.
                                </p>
                            </div>
                            <button
                                className="p-2 bg-rose-50 text-rose-800 h-fit rounded-full cursor-pointer hover:bg-rose-200 active:scale-95 transition-all duration-200"
                                onClick={() => setActivePopup(null)}
                            >
                                <X />
                            </button>
                        </div>
                        <div className="overflow-auto pr-1 max-h-77.75 divide-y divide-slate-100 relative z-99">
                            {paidInvoices.map((invoice) => (
                                <div
                                    key={invoice.id}
                                    className="flex justify-between py-3.5 first:pt-0 last:pb-0"
                                >
                                    <div>
                                        <h4 className="text-sm font-semibold text-slate-800">
                                            {invoice.title}
                                        </h4>
                                        <p className="text-xs text-slate-400">
                                            Diverifikasi pada:{" "}
                                            {formatDate(
                                                invoice.paid_at,
                                                "short",
                                            )}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="text-sm font-semibold text-slate-800">
                                            {formatMoney(invoice.amount)}
                                        </p>
                                        <a
                                            href={route(
                                                "invoices.receipt",
                                                invoice.id,
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex gap-1.5 items-center cursor-pointer bg-emerald-50 text-emerald-700 px-3 py-2 rounded-lg hover:bg-emerald-100 active:scale-95 transition-all duration-200 select-none"
                                        >
                                            <FileDown size={15} />
                                            <span className="text-xs font-semibold">
                                                Bukti
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {selectedInvoice && activePopup === "pay_now" && (
                <div
                    className="fixed inset-0 z-2 bg-black/60 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300"
                    onClick={() => setActivePopup(null)}
                >
                    <div
                        className="bg-white border border-slate-300 w-[90vw] lg:w-125 rounded-2xl shadow-2xl p-8 relative overflow-hidden animate-in slide-in-from-bottom-10 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-6 flex justify-between">
                            <div>
                                <h3 className="font-bold tracking-tight text-base text-slate-900">
                                    Panduan Pembayaran
                                </h3>
                                <p className="text-slate-400 text-xs mt-0.5">
                                    Silakan transfer tepat sesuai nominal yang
                                    tertera ke rekening resmi sekolah.
                                </p>
                            </div>
                            <button
                                className="p-2 bg-rose-50 text-rose-800 h-fit rounded-full cursor-pointer hover:bg-rose-200 active:scale-95 transition-all duration-200"
                                onClick={() => setActivePopup(null)}
                            >
                                <X />
                            </button>
                        </div>
                        <div className="p-4 bg-amber-50 border border-slate-300 shadow-sm rounded-xl">
                            <h4 className="font-bold text-xs tracking-wider text-slate-800 mb-1.5">
                                Jumlah yang Harus Ditransfer
                            </h4>
                            <p className="font-bold text-3xl text-slate-900 tracking-tight font-display">
                                {formatMoney(selectedInvoice.amount)}
                            </p>
                            <p className="text-xs text-amber-700/80 mt-1.5">
                                *Transfer tepat sesuai nominal agar verifikasi
                                lebih cepat.
                            </p>
                        </div>
                        <div className="mt-3 p-4 border border-slate-300 shadow-sm rounded-xl">
                            <h4 className="font-bold text-xs tracking-wider text-slate-800 mb-1.5">
                                Rekening Tujuan Sekolah
                            </h4>
                            <div className="mt-3 flex justify-between items-center">
                                <div className="flex gap-3">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf2aPvthdxs8QpYIeA11K-cgexgd0jzsL197Uy59vtqQ&s=10"
                                        className="h-12 w-12 object-cover rounded-lg border border-slate-300 shadow-md"
                                        alt=""
                                    />
                                    <div>
                                        <p className="text-sm font-bold text-slate-800 leading-tight">
                                            SDIT BISA BOGOR
                                        </p>
                                        <p
                                            ref={textRef}
                                            className="text-md font-semibold font-mono text-slate-600 mt-1 tracking-wide"
                                        >
                                            71239352432423
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={copyToClipboard}
                                    className="border border-slate-300 px-3 py-1.5 text-xs rounded-xl font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 active:scale-95 transition-all duration-200 cursor-pointer"
                                    disabled={copied}
                                >
                                    {copied ? "Tersalin!" : "Salin"}
                                </button>
                            </div>
                        </div>

                        <p className="text-center text-slate-400 text-xs leading-relaxed mt-5">
                            Setelah transfer sukses, harap simpan bukti
                            transaksi Anda.
                            <br />
                            Sistem akan memperbarui status dashboard secara
                            berkala.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
