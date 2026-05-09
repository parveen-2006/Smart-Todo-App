import React, { useState } from 'react'
import instance from '../Services/Api';
import { useNavigate } from 'react-router-dom';


export default function Login() {

    const navigate = useNavigate()
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await instance.post("/auth/login", login)
            localStorage.setItem("token", response.data.token);
            console.log(response.data);

            if (response.data.success || response.data.token) {
                alert("login successful");
                navigate("/")
            }
        } catch (err) {
            console.log("Login err :", err);
        }
    }

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md">

                {/* Logo / Brand */}
                <div className="flex items-center gap-2 justify-center mb-8">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-400 flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2 7l3.5 3.5L12 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span className="text-white font-bold text-lg tracking-tight">
                        Smart<span className="text-emerald-500">Todo</span>
                    </span>
                </div>

                {/* Card */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

                    <div className="mb-7">
                        <h1 className="text-white text-2xl font-bold tracking-tight mb-1">Welcome back</h1>
                        <p className="text-zinc-500 text-sm">Sign in to continue to your workspace</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-zinc-400 text-xs font-medium uppercase tracking-widest">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="john@example.com"
                                value={login.email}
                                name="email"
                                onChange={handleChange}
                                required
                                className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all duration-200"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between">
                                <label className="text-zinc-400 text-xs font-medium uppercase tracking-widest">
                                    Password
                                </label>
                                <span className="text-zinc-500 text-xs hover:text-emerald-500 cursor-pointer transition-colors">
                                    Forgot password?
                                </span>
                            </div>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={login.password}
                                name="password"
                                onChange={handleChange}
                                required
                                className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all duration-200"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="mt-2 w-full bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white font-semibold text-sm py-2.5 rounded-xl transition-all duration-200"
                        >
                            Sign In
                        </button>

                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-zinc-800" />
                        <span className="text-zinc-600 text-xs">don't have an account?</span>
                        <div className="flex-1 h-px bg-zinc-800" />
                    </div>

                    {/* Signup redirect */}
                    <button
                        onClick={() => navigate("/signup")}
                        className="w-full border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white text-sm font-medium py-2.5 rounded-xl transition-all duration-200"
                    >
                        Create an account
                    </button>

                </div>

                <p className="text-center text-zinc-600 text-xs mt-6">
                    Protected by{" "}
                    <span className="text-zinc-500">SmartTodo</span>
                    {" "}· All rights reserved
                </p>

            </div>
        </div>
    )
}