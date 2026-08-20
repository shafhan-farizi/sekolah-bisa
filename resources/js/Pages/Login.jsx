import { Head, useForm } from "@inertiajs/react";
import {
    BellRing,
    BookOpen,
    BookOpenText,
    Copyright,
    Shield,
} from "lucide-react";

export default function Login() {
    const { data, setData, post, errors, processing, transform } = useForm({
        email: "wali@gmail.com",
        password: "password",
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post("/login", data);
    };

    return (
        <>
            <Head title="Login" />

            <main className="min-h-screen flex bg-slate-100 font-sans">
                <aside className="hidden lg:flex flex-1 flex-col justify-center z-99 p-15 max-w-lg bg-emerald-900 text-white overflow-hidden relative">
                    <div className="absolute -right-30 -top-30 h-65 w-65 rounded-full bg-emerald-500 opacity-10"></div>
                    <div className="absolute bottom-70 right-10 h-40 w-40 rounded-full bg-white opacity-10"></div>
                    <div className="absolute bottom-15 -left-10 h-55 w-55 rounded-full bg-lime-50 opacity-10"></div>
                    <div className="flex-1">
                        <div className="flex gap-x-4 mb-8 items-center">
                            <BookOpen className="size-6" />
                            <div className="flex flex-col">
                                <span className="font-semibold tracking-tight text-lg -mb-1">
                                    WaliDashboard
                                </span>
                                <p className="text-sm text-emerald-100/70">
                                    Portal Orang Tua Siswa
                                </p>
                            </div>
                        </div>
                        <h1 className="font-serif text-4xl font-semibold tracking-tight leading-[1.15] text-white">
                            Tetap Terhubung dengan{" "}
                            <span className="text-lime-300 block mt-1">
                                Perkembangan Anak
                            </span>
                        </h1>
                        <p className="font-sans text-sm leading-relaxed text-emerald-100/80 mt-4 mb-10 max-w-md">
                            Platform digital untuk memantau informasi akademik,
                            kehadiran, dan tagihan sekolah putra-putri Anda —
                            kapan saja, di mana saja.
                        </p>

                        <ul>
                            <li className="flex gap-x-5 items-center mb-4">
                                <div className="p-2 bg-emerald-800 rounded-full text-white">
                                    <BookOpenText className="size-5" />
                                </div>
                                <div className="flex flex-col space-y-0.5">
                                    <h3 className="text-sm font-semibold text-white tracking-wide">
                                        Informasi Siswa Lengkap
                                    </h3>
                                    <p className="text-xs leading-normal text-emerald-100/70">
                                        Lihat profil, data akademik, dan kontak
                                        darurat anak Anda.
                                    </p>
                                </div>
                            </li>
                            <li className="flex gap-x-5 items-center mb-4">
                                <div className="p-2 bg-emerald-800 rounded-full text-white">
                                    <BellRing className="size-5" />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-sm font-semibold text-white tracking-wide">
                                        Notifikasi Tagihan
                                    </h3>
                                    <p className="text-xs leading-normal text-emerald-100/70">
                                        Pantau status SPP dan tagihan sekolah
                                        secara real-time.
                                    </p>
                                </div>
                            </li>
                            <li className="flex gap-x-5 items-center mb-4">
                                <div className="p-2 bg-emerald-800 rounded-full text-white">
                                    <Shield className="size-5" />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-sm font-semibold text-white tracking-wide">
                                        Data Aman & Terlindungi
                                    </h3>
                                    <p className="text-xs leading-normal text-emerald-100/70">
                                        Akses data terisolasi — hanya Anda yang
                                        bisa melihat data anak Anda.
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="pt-6 border-t border-emerald-100/20">
                        <p className="text-xs text-emerald-100/60">
                            Dikembangkan untuk
                        </p>
                        <strong className="font-sans text-sm">
                            SDIT BISA BOGOR
                        </strong>
                        <address className="text-xs text-emerald-100/60">
                            Jl. Kh abdul Hamid, Kp. Sirnasari, RT.006/RW.002,
                            Gn. Sari, Kec. Pamijahan, Kabupaten Bogor, Jawa
                            Barat 16810
                        </address>
                    </div>
                </aside>

                <section className="flex-1 flex flex-col items-center justify-center">
                    <div className="text-center mb-10 lg:hidden">
                        <p className="font-semibold text-sm mb-2 tracking-wide text-emerald-800/70">
                            SDIT BISA BOGOR
                        </p>
                        <h1 className="text-3xl font-semibold text-emerald-900">
                            Portal Orang Tua
                        </h1>
                        <p className="text-sm opacity-80">
                            Pantau perkembangan putra-putri Anda
                        </p>
                    </div>
                    <div className="relative overflow-hidden max-w-md w-full bg-white p-8 sm-p6 rounded-xl shadow-lg border border-slate-100">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#d1fae5_1px,transparent_1px),linear-gradient(to_bottom,#d1fae5_1px,transparent_1px)] bg-size-[20px_20px] mask-[radial-gradient(circle_at_top,white_10%,transparent_25%)]"></div>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-150 w-150 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_50%)]"></div>

                        <div className="relative bg-emerald-800 text-emerald-50 p-3 shadow-sm w-fit rounded-full mx-auto mb-8 z-99">
                            <BookOpen size={40} />
                        </div>
                        <div className="mb-5 text-center">
                            <h2 className="font-serif font-semibold text-xl">
                                Selamat Datang
                            </h2>
                            <p className="text-sm opacity-70">
                                Masuk untuk melihat informasi anak Anda
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="relative z-99">
                            <div className="space-y-4">
                                <div className="flex flex-col gap-y-1">
                                    <label
                                        htmlFor="email"
                                        className="text-sm font-semibold"
                                    >
                                        Email Orang Tua
                                    </label>
                                    <input
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        type="email"
                                        placeholder="wali@gmail.com"
                                        className="text-sm font-normal bg-emerald-50 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:shadow-lg focus:shadow-emerald-100 rounded-lg p-2 transition duration-300"
                                    />
                                </div>
                                <div className="flex flex-col gap-y-1">
                                    <label
                                        htmlFor="password"
                                        className="text-sm font-semibold"
                                    >
                                        Password Anda
                                    </label>
                                    <input
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        type="password"
                                        placeholder="Masukkan kata sandi"
                                        className="text-sm font-normal bg-emerald-50 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:shadow-lg focus:shadow-emerald-100 rounded-lg p-2 transition duration-300"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-xs font-semibold text-red-500 -mt-3">
                                        {errors.email}
                                    </p>
                                )}
                                <div className="flex justify-between items-center">
                                    <label className="flex items-center gap-x-1 text-sm font-normal cursor-pointer select-none">
                                        <input
                                            value={data.remember}
                                            onChange={(e) =>
                                                setData(
                                                    "remember",
                                                    e.target.checked,
                                                )
                                            }
                                            type="checkbox"
                                            className="accent-emerald-700 h-4 w-4 cursor-pointer"
                                        />
                                        <span>Ingat Saya</span>
                                    </label>
                                    <div className="group flex flex-col items-end cursor-pointer">
                                        <a
                                            href="#"
                                            className="text-sm text-emerald-900"
                                        >
                                            Lupa kata sandi?
                                        </a>
                                        <div className="h-0.5 w-0 group-hover:w-full transition-all duration-300 bg-emerald-900"></div>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="mt-4 w-full py-2 active:scale-95 bg-emerald-800 text-white font-semibold rounded-lg shadow-lg hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-100 transition duration-300 cursor-pointer select-none"
                                >
                                    {processing
                                        ? "Memproses..."
                                        : "Masuk Sekarang"}
                                </button>
                            </div>
                        </form>
                    </div>
                    <p className="flex items-center text-center text-sm opacity-60 mt-4">
                        <Copyright size={18} /> 2026 WaliDashboard - SDIT Bisa
                        Bogor
                    </p>
                </section>
            </main>
        </>
    );
}
