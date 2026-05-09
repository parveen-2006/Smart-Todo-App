import React, { useState } from 'react';
import { useEffect } from 'react';
import instance from "../Services/Api"
import { CiEdit } from "react-icons/ci";
import Navbar from '../Components/Navbar';


export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");

    //for editTitle
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState("");

    //Fetch tasks
    const fetchTasks = async () => {
        try {
            const res = await instance.get('/tasks');
            setTasks(res.data.tasks);
        } catch (err) {
            console.log("fetch err", err)
        }
    }

    // Run on Load
    useEffect(() => {
        fetchTasks();
    })

    const handleAdd = async () => {
        if (!title) return;
        try {
            await instance.post("/tasks", { title });
            setTitle("");
            fetchTasks();
        } catch (err) {
            console.log("Add err", err)
        }
    };

    const handleDelete = async (id) => {
        try {
            await instance.delete(`/tasks/${id}`);
            fetchTasks();
        } catch (err) {
            console.log("delete err", err)
        }
    }

    const toggleTask = async (id) => {
        try {
            await instance.patch(`/tasks/${id}`);
            fetchTasks()
        } catch (err) {
            console.log("toggle err", err)
        }
    }

    const updateTask = async (id) => {
        try {
            await instance.put(`/tasks/${id}`, { title: editTitle })
            setEditId(null)
            fetchTasks();
        } catch (err) {
            console.log("update task : ", err)
        }
    }

    const pendingCount = tasks.filter(t => t.status === "pending").length;
    const completedCount = tasks.filter(t => t.status === "completed").length;

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-zinc-950 px-4 py-10">
                <div className="max-w-2xl mx-auto">

                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-white text-2xl font-bold tracking-tight mb-1">My Workspace</h1>
                        <p className="text-zinc-500 text-sm">
                            {new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(new Date())}
                        </p>
                    </div>

                    {/* Stat Pills */}
                    <div className="grid grid-cols-3 gap-3 mb-8">
                        {[
                            { label: "Total", value: tasks.length, color: "text-zinc-300" },
                            { label: "Pending", value: pendingCount, color: "text-emerald-400" },
                            { label: "Completed", value: completedCount, color: "text-cyan-400" },
                        ].map(({ label, value, color }) => (
                            <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4">
                                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">{label}</p>
                                <p className={`${color} text-2xl font-bold`}>{value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Add Task */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-6">
                        <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">+ New Task</p>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                                placeholder="What needs to be done?"
                                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all duration-200"
                            />
                            <button
                                onClick={handleAdd}
                                className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 whitespace-nowrap"
                            >
                                Add Task
                            </button>
                        </div>
                    </div>

                    {/* Task List */}
                    {tasks.length === 0 ? (
                        <div className="bg-zinc-900 border border-dashed border-zinc-800 rounded-2xl py-16 text-center">
                            <p className="text-2xl mb-3">🚀</p>
                            <p className="text-white font-semibold text-sm mb-1">No tasks yet</p>
                            <p className="text-zinc-600 text-xs">Add your first task above to get started</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {tasks.map((task) => (
                                <div
                                    key={task._id}
                                    className={`bg-zinc-900 border rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40 hover:border-zinc-700 ${task.status === "completed" ? "border-zinc-800/60 opacity-60" : "border-zinc-800"}`}
                                >
                                    {/* Task title row */}
                                    <div className="flex items-start justify-between gap-4 mb-3">
                                        <div className="flex items-start gap-3 flex-1 min-w-0">
                                            {/* Status dot */}
                                            <span className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${task.status === "completed" ? "bg-zinc-600" : "bg-emerald-500"}`} />

                                            {editId === task._id ? (
                                                /* Edit mode */
                                                <div className="flex gap-2 flex-1">
                                                    <input
                                                        type="text"
                                                        value={editTitle}
                                                        onChange={(e) => setEditTitle(e.target.value)}
                                                        onKeyDown={(e) => e.key === "Enter" && updateTask(task._id)}
                                                        autoFocus
                                                        className="flex-1 bg-zinc-950 border border-cyan-500/40 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-200"
                                                    />
                                                    <button
                                                        onClick={() => updateTask(task._id)}
                                                        className="bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-400 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditId(null)}
                                                        className="text-zinc-500 hover:text-zinc-300 text-xs px-2 py-1.5 rounded-lg transition-colors duration-200"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                /* View mode */
                                                <p className={`text-sm font-medium leading-relaxed ${task.status === "completed" ? "line-through text-zinc-500" : "text-white"}`}>
                                                    {task.title}
                                                </p>
                                            )}
                                        </div>

                                        {/* Action Buttons — only show in view mode */}
                                        {editId !== task._id && (
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                {/* Complete / Undo */}
                                                {task.status === "pending" ? (
                                                    <button
                                                        onClick={() => toggleTask(task._id)}
                                                        className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 active:scale-95"
                                                    >
                                                        Complete
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => toggleTask(task._id)}
                                                        className="bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 active:scale-95"
                                                    >
                                                        Undo
                                                    </button>
                                                )}

                                                {/* Edit */}
                                                <button
                                                    onClick={() => { setEditId(task._id); setEditTitle(task.title); }}
                                                    className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-400 p-1.5 rounded-lg transition-all duration-200 active:scale-95"
                                                >
                                                    <CiEdit size={16} />
                                                </button>

                                                {/* Delete */}
                                                <button
                                                    onClick={() => handleDelete(task._id)}
                                                    className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 p-1.5 rounded-lg transition-all duration-200 active:scale-95"
                                                >
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                                                        <path d="M2 3.5h10M5.5 3.5V2.5a1 1 0 012 0v1M5 3.5l.5 8M9 3.5l-.5 8" />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Status badge */}
                                    <div className="pl-5">
                                        <span className={`text-xs px-2.5 py-1 rounded-md font-medium ${task.status === "completed"
                                            ? "bg-zinc-800 text-zinc-500"
                                            : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                                            }`}>
                                            {task.status === "completed" ? "✓ Completed" : "● Pending"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Footer hint */}
                    {tasks.length > 0 && (
                        <p className="text-center text-zinc-700 text-xs mt-8 tracking-wide">
                            press enter to add · esc to cancel edit
                        </p>
                    )}

                </div>
            </div>
        </>
    );
}