import React, { useState } from 'react';
import { useEffect } from 'react';
import instance from "../Services/Api"
import { CiEdit } from "react-icons/ci";


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
            await instance.put(`/tasks/${id}` , {
                title : editTitle
            })

            setEditId(null)

            fetchTasks();
        } catch (err) {
            console.log("update task : ", err)
        }
    }


    return (
        <div>
            <h3>Smart Todo</h3>

            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <button onClick={handleAdd}>Add</button>

            {tasks.map((task) => (
                <div key={task._id}>
                    <div key={task._id}>Task :  {task.title}</div>
                    <button onClick={() => handleDelete(task._id)}>Delete</button>
                    <button onClick={() => toggleTask(task._id)}>
                        {task.status === "pending"
                            ? "complete" : "Undo"
                        }
                    </button>
                    {
                        editId === task._id ? (
                            <>
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                />

                                <button onClick={() => updateTask(task._id)}>
                                    save
                                </button>
                            </>
                        ) : (
                            <>

                                <button onClick={() => {
                                    setEditId(task._id)
                                    setEditTitle(task.title)
                                }}>
                                    <CiEdit />
                                </button>

                            </>
                        )
                    }







                    <p>Status : {task.status}</p>


                    <hr />
                </div>
            ))}
        </div>
    );
}