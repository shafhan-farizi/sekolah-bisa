import { Head, Link } from "@inertiajs/react";
import { AlertTriangle, FileQuestion, Lock, ShieldAlert } from "lucide-react";

export default function Error({ status }) {
    const titles = {
        404: "Halaman Tidak Ditemukan",
        403: "Akses Dibatasi",
        423: "Akun Ditangguhkan",
        500: "Terjadi Kendala pada Server",
        503: "Layanan Sedang Pemeliharaan",
    };

    const descriptions = {
        404: "Maaf, halaman atau dokumen yang Anda tuju tidak tersedia.",
        403: "Anda tidak memiliki izin untuk mengakses halaman ini.",
        423: "Akun ini sedang dikunci sementara oleh pihak sekolah.",
        500: "Terjadi kesalahan teknis pada sistem kami. Silakan coba beberapa saat lagi.",
        503: "Portal sedang dalam perbaikan rutin. Kami akan segera kembali.",
    };

    const icons = {
        404: <FileQuestion size={48} className="text-emerald-800" />,
        403: <ShieldAlert size={48} className="text-amber-600" />,
        423: <Lock size={48} className="text-rose-600" />,
        500: <AlertTriangle size={48} className="text-rose-600" />,
    };

    const title = titles[status] || "Terjadi Kesalahan";
    const description =
        descriptions[status] || "Terjadi kesalahan tak terduga.";
    const icon = icons[status] || (
        <AlertTriangle size={48} className="text-slate-600" />
    );

    return (
        <div className="min-h-screen bg-[#F8F7F3] flex items-center justify-center p-4">
            <Head title={`${status}: ${title}`} />

            <div className="bg-white border border-slate-300 max-w-md w-full p-8 rounded-3xl text-center shadow-xl">
                <div className="p-4 bg-slate-50 rounded-2xl w-fit mx-auto mb-4 border border-slate-200">
                    {icon}
                </div>

                <span className="text-xs font-bold text-slate-400 tracking-widest block uppercase mb-1">
                    Status HTTP {status}
                </span>
                <h1 className="text-2xl font-bold font-display text-emerald-950 mb-2">
                    {title}
                </h1>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    {description}
                </p>

                <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl transition duration-200"
                >
                    Kembali ke Dashboard
                </Link>
            </div>
        </div>
    );
}
