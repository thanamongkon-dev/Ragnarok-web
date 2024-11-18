import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // If you're using react-router

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const login = async (username, password) => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('https://console-log.online/api/login.php', {
                username: username,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'เข้าสู่ระบบสำเร็จ!',
                    text: response.data.message,
                }).then(() => {
                    // Save user data and redirect to the Member page
                    localStorage.setItem('user', JSON.stringify(response.data));
                    navigate('/member'); // Redirect to Member page
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'ข้อผิดพลาด',
                    text: response.data.message,
                });
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'ข้อผิดพลาด',
                text: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์',
            });
            console.error('Error during login:', err);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        Swal.fire({
            icon: 'success',
            title: 'ออกจากระบบสำเร็จ!',
            text: 'กลับสู่หน้าหลัก',
        })
        navigate('/home');
    }

    return { login, logout, loading, error };
};

export default useLogin;
