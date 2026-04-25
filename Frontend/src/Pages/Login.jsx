import React, { useState } from 'react'

export default function Login() {
    const [login, setLogin] = useState({
        name: "",
        password: ""
    })
    return (
        <div>
            <form>
                <input type="text"
                    placeholder='Enter your name'
                    value={login.name}
                    name="name" />
            </form>
        </div>
    )
}
