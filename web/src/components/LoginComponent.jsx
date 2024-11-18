import React, { useState, useEffect } from "react";
import useLogin from "../hooks/useLogin";
import logo from '../assets/iris-ro/logo.png';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, loading } = useLogin();


  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
        navigate('/member');
    }
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    // login(username, password);
    login("pppitsamai03", "123456");
  };

    return (
        <div className="h-full min-h-screen p-10 mx-auto bg-slate-800">
            <div className="max-w-md mx-auto p-12 bg-white rounded-lg shadow-lg">
                <div className="flex flex-col h-full items-center justify-center w-full mx-auto">
                    <img src={logo} alt="Logo" className="h-32 w-36" />
                    <h1 className="text-2xl font-bold text-center text-neutral-800">เข้าสู่ระบบ</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                        Username:
                        </label>
                        <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Username"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password:
                        </label>
                        <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Password"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded text-white font-bold ${
                        loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-700"
                        } focus:outline-none focus:shadow-outline`}
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginComponent;
