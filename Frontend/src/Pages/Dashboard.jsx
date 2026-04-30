import React, { useState } from 'react';

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");

    const handleAdd = () => {
        if (!title) return;

        const newTask = {
            id: Date.now(),
            title,
        };

        setTasks([...tasks, newTask]); // ✅ FIXED
        setTitle("");
    };
    const handleDelete = (e) => {
        console.log()
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

            {tasks.map((task) => (<div>

                <div key={task.id}>{task.title}</div>
                <button onClick={handleDelete}>Delete</button>

            </div>
            ))}
        </div>
    );
}