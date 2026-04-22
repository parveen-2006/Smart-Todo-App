import React from 'react'
import { useState } from 'react'

export default function Signin() {
    const [register, setRegister] = useState({
        name: "",
        email: "",
        password: ""
    })
    return (
        <div>
            <h1>Register</h1>
            <form>
                <input type="text" 
                value={register.name} 
                placeholder='Enter your name'
                onChange={handleClick}
                
                />
            </form>
        </div>
    )
}
