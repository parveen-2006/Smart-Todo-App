import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 px-6 h-14 flex items-center justify-between">

            {/* Brand */}
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-emerald-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7l3.5 3.5L12 3.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <h2 className="text-white font-bold text-base tracking-tight">
                    Smart<span className="text-emerald-500">Todo</span>
                </h2>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
                <Link
                    to="/"
                    className="text-zinc-400 hover:text-white text-sm transition-colors duration-200"
                >
                    Dashboard
                </Link>

                <button
                    onClick={handleLogout}
                    className="border border-zinc-800 hover:border-red-500/40 text-zinc-400 hover:text-red-400 text-sm px-4 py-1.5 rounded-lg transition-all duration-200 active:scale-95"
                >
                    Logout
                </button>
            </div>

        </nav>
    );
}