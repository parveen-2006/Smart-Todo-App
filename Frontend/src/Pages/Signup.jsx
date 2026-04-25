import React from 'react'
import { useState } from 'react'

export default function Signup() {
    const [register, setRegister] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await instance.post("/signup")

        } catch (err) {
            console.log("Registration err " , err)   
        }


    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegister((prev) => ({ ...prev, [name]: value }));
    }
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="name"
                    value={register.name}
                    placeholder='Enter your name'
                    name='name'
                    onChange={handleChange}
                    required
                /> <br /> <br />
                <input
                    type="email"
                    value={register.email}
                    placeholder='Enter your Email'
                    name='email'
                    onChange={handleChange}
                    required
                /> <br /> <br />
                <input
                    type="password"
                    value={register.password}
                    placeholder='Enter your Password'
                    name='password'
                    onChange={handleChange}
                    required
                /> <br /> <br />
                <button type='submit'>Register</button>
            </form>
        </div>
    )
}
