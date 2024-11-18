import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logout } from "../../stores/slices/authSlice";
import { showSuccessAlert, showErrorAlert } from "../../utils/alertService";
import useEncryption from "../../utils/useEncryption";

const Login = () => {
    const dispatch = useDispatch();
    const [userForm, setUserForm] = useState({
        username: "",
        password: "",
    });
    const { user, status, loading, error } = useSelector((state) => state.auth);

    const { encryptData, decryptData } = useEncryption();

    const handleLogin = (e) => {
        e.preventDefault();
        const data = {
            username: userForm.username,
            password: encryptData(userForm.password),
        }
        const url = "http://localhost/api/getCash?"
        const value = "accountId=2000000"
        console.log(url + encryptData(value))
        console.log(data)
        // dispatch(loginUser(data));
    };

    const handleLogout = () => {
        dispatch(logout());
        showSuccessAlert("You have been logged out successfully.");
    };

    useEffect(() => {
        if (status === "succeeded") {
        showSuccessAlert("Login successful!");
        } else if (status === "failed") {
        showErrorAlert(error);
        }
    }, [status, error]);

    return (
        <form onSubmit={handleLogin} className="space-y-4">
            <div>
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Username
                </label>
                <input
                    type="text"
                    value={userForm.username}
                    onChange={(e) =>
                        setUserForm({ ...userForm, username: e.target.value })
                    }
                    placeholder="Username"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div>
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Password
                </label>
                <input
                    type="password"
                    value={userForm.password}
                    onChange={(e) =>
                        setUserForm({ ...userForm, password: e.target.value })
                    }
                    placeholder="Password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
    );
};

export default Login;
