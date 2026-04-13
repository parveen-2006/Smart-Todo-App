import React, { useState } from 'react'

export default function TaskCard({ task, onDelete, onToggle }) {
    return (
        <div style={{ margin: "10px 0" }}>
            <span
                onClick={() => onToggle(task.id)}
                style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    cursor: "pointer"
                }}
            >
                {task.title}
            </span>

            <button onClick={() => onDelete(task.id)}>Delete</button>
        </div>
    );
}
