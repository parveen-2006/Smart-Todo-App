import React, { useState } from 'react'
import instance from '../Services/Api';
import { useNavigate } from 'react-router-dom';


export default function Login() {

    const navigate = useNavigate()
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e)  =>{
        const {name , value} = e.target;
        setLogin((prev)=>({...prev , [name] : value}));
    } 
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const response = await instance.post("/auth/login" , login)
            localStorage.setItem("token" , response.data.token);
            console.log(response.data);

            if(response.data.success || response.data.token){
                alert("login successful");
                navigate("/")
            }
            
        } catch (err) {
            console.log("Login err :" ,err  );
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email"
                    placeholder='Enter your name'
                    value={login.email}
                    name="email" 
                    onChange={handleChange}
                    />
                <input type="password"
                    placeholder='Enter your name'
                    value={login.password}
                    name="password" 
                    onChange={handleChange}
                    />
                    <button type="submit">login</button>
            </form>
        </div>
    )
}
