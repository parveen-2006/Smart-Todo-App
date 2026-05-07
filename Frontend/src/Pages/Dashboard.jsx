import React, { useState } from 'react';
import { useEffect } from 'react';
import instance from "../Services/Api"


export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");

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
    const handleDelete = async (e) => { 
        console.log("Delete Tasks")
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
                <div>
                    <div key={task._id}>{task.title}</div>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            ))}
        </div>
    );
}