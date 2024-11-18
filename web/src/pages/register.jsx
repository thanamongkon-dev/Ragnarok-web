import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    gender: 'M',
    date: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username || formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
    }

    // Password validation
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    // Confirm Password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Date validation (optional: ensure the date is not in the future)
    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const currentDate = new Date();
      if (selectedDate > currentDate) {
        newErrors.date = 'Date cannot be in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('https://console-log.online/api/register.php', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'สำเร็จ',
          text: 'สร้างบัญชีผู้ใช้งานสำเร็จ!',
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'เกิดข้อผิดพลาดในการสร้างบัญชีผู้ใช้งาน',
        })
      }
    } catch (error) {
      console.error('Registration Error:', error);
      alert('An error occurred during registration. Please try again.');
    }
  };

  return (
    <section id="register" className="flex items-center justify-center mx-auto w-full bg-slate-950 min-h-screen overflow-hidden bg-cover bg-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">Create Account</h1>
          <p className="text-lg font-bold opacity-70">สร้างบัญชีผู้ใช้งาน</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="username" className="mb-2 font-medium">Username/ID</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="ไอดีผู้ใช้งาน"
              required
              className="p-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-2 font-medium">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="รหัสผ่าน"
              required
              className="p-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="mb-2 font-medium">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="ยืนยันรหัสผ่าน"
              required
              className="p-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="อีเมลล์"
              required
              className="p-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="gender" className="mb-2 font-medium">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="p-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              required
            >
              <option value="M">ชาย</option>
              <option value="F">หญิง</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="date" className="mb-2 font-medium">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="p-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            {errors.date && <span className="text-red-500 text-sm">{errors.date}</span>}
          </div>
          <button type="submit" className="w-full py-3 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition duration-300">สร้างบัญชี</button>
          <p className="text-sm mt-4 opacity-70 text-center">มีบัญชีอยู่แล้ว? <a href="/donate" className="underline text-blue-500 hover:text-blue-700">เข้าสู่ระบบ</a></p>
        </form>
      </div>
    </section>
  );
};

export default Register;
