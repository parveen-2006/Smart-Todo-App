import React from 'react'
import Dashboard from './Pages/Dashboard'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import { Routes, Route } from "react-router-dom"
import ProtectedRoute from './Components/ProtectedRoute'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  )
};