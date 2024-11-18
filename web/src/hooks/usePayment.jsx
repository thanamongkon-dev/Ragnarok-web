import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const doCallAjaxLogin = async (username, password) => {
        if (!username) {
            Swal.fire({
                icon: 'warning',
                title: 'แจ้งเตือน',
                text: 'กรุณากรอก Account ID!'
            });
            return;
        }

        if (!password) {
            Swal.fire({
                icon: 'warning',
                title: 'แจ้งเตือน',
                text: 'กรุณากรอก Password!'
            });
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('https://console-log.online/api/login.php', {
                tUsername: username,
                tPassword: password
            });
            
            if (response.data !== 'ok') {
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาด',
                    text: 'กรุณาตรวจสอบ ID หรือ Password ของคุณ!'
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'สำเร็จ',
                    text: 'กำลังพาท่านเข้าสู่ระบบ!',
                    showConfirmButton: false,
                    timer: 1500
                });
                Swal.showLoading();
                setTimeout(() => {
                    document.getElementById('loginForm').submit();
                }, 2000);
            }
        } catch (err) {
            setError(err);
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้'
            });
        } finally {
            setLoading(false);
        }
    };

    return { doCallAjaxLogin, loading, error };
};

const usePay = (userid, accountid) => {
    const [loading, setLoading] = useState(false);

    const genRef = () => {
        return userid.length > 9
            ? `${userid.substring(0, 9)}${new Date().getFullYear() - 2000}${new Date().getMonth() + 1}${new Date().getDate()}${Math.floor(89999 * Math.random()) + 10000}`
            : `${userid}${new Date().getFullYear() - 2000}${new Date().getMonth() + 1}${new Date().getDate()}${Math.floor(89999 * Math.random()) + 10000}`;
    };

    const FunctionPay = async (amount) => {
        const ref = genRef();
        const data = `tRef=${ref}&tAmout=${amount}&tAccountId=${accountid}`;

        Swal.fire({
            title: 'กรุณารอซักครู่!',
            showCancelButton: false,
            showLoaderOnConfirm: false,
            allowOutsideClick: false,
            allowEscapeKey: false
        });
        Swal.showLoading();

        try {
            const response = await axios.post('function/form_scb.php', data);
            const newRef = response.data;

            if (newRef !== 'error') {
                const img = new Image(300, 300);
                img.onload = () => {
                    Swal.hideLoading();
                    Swal.fire({
                        title: `ราคา ${amount}`,
                        text: `หลังจากยืนยันการโอนเงินแล้วกรุณารอสักครู่หน้านี้จะปิดลงเอง **1 QR Code ใช้ได้แค่ 1 ครั้งห้ามใช้ซ้ำ **`,
                        imageUrl: `${scb_domain}/api/payment/${scb_id}/${newRef}/${amount}`,
                        cancelButtonColor: '#d33',
                        cancelButtonText: 'ยกเลิก',
                        showCancelButton: true,
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        onOpen: () => autoCheckPay(newRef, amount, accountid),
                        onClose: () => window.location.reload()
                    });
                };
                img.src = `${scb_domain}/api/payment/${scb_id}/${newRef}/${amount}`;
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาด',
                    text: 'คุณทำรายการเกินจำนวนที่กำหนด โปรดรอประมาณ 10 นาที'
                });
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้'
            });
        } finally {
            setLoading(false);
        }
    };

    const autoCheckPay = async (ref, amount, accountid) => {
        const data = `tRef=${ref}&tAmout=${amount}&tAccountId=${accountid}`;

        try {
            const response = await axios.post('function/check_scb.php', data);

            if (response.data !== 'ok' && response.data !== 'true') {
                setTimeout(() => autoCheckPay(ref, amount, accountid), 3000);
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'สำเร็จ',
                    text: 'คุณทำการโอนเงินสำเร็จ!'
                }).then(() => {
                    setTimeout(() => window.location.reload(), 2000);
                });
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้'
            });
        }
    };

    return { FunctionPay, loading };
};

const useEventHandlers = () => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.shiftKey && e.keyCode === 73) e.preventDefault();
            if (e.ctrlKey && e.shiftKey && e.keyCode === 74) e.preventDefault();
            if (e.keyCode === 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) e.preventDefault();
            if (e.ctrlKey && e.keyCode === 85) e.preventDefault();
            if (e.keyCode === 123) e.preventDefault();
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return {};
};

const Payment = () => {
    const { doCallAjaxLogin, loading: loginLoading, error: loginError } = useLogin();
    const { FunctionPay, loading: payLoading } = usePay('userid123', 'accountid123');
    useEventHandlers();

    // You can add your component logic here, for example:
    const handleLogin = () => {
        // const username = document.getElementById('txtUsername').value;
        // const password = document.getElementById('txtPassword').value;
        doCallAjaxLogin("pppitsamai03", "123456");
    };

    const handlePay = () => {
        const amount = 100; // Example amount
        FunctionPay(amount);
    };

    return (
        <div>
            <button onClick={handleLogin} disabled={loginLoading}>Login</button>
            <button onClick={handlePay} disabled={payLoading}>Pay</button>
        </div>
    );
};

export default Payment;
