import React, { useState } from "react";
import NewsCard from "./NewsCard";

const NewsForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        time: "",
        image: "",
    });

    const [content, setContent] = useState([]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            setFormData((prev) => ({
            ...prev,
            image: reader.result, // Save base64 string for preview
            }));
        };
        reader.readAsDataURL(file);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.title && formData.description) {
        setContent((prev) => [...prev, { ...formData, time: new Date().toLocaleString() }]);
        setFormData({
            title: "",
            description: "",
            time: "",
            image: "",
        });
        }
    };

    return (
        <div className="container mx-auto grid grid-cols-2 gap-4">
        {/* News Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border rounded">
            <h1 className="text-2xl font-bold">สร้างข่าวสาร</h1>

            <div className="flex flex-col text-lg gap-2">
            <label htmlFor="title">หัวข้อ</label>
            <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="border rounded p-1"
            />
            </div>

            <div className="flex flex-col text-lg gap-2">
            <label htmlFor="description">รายละเอียด</label>
            <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="border rounded p-1"
            />
            </div>

            <div className="flex text-lg gap-2">
            <label htmlFor="image">รูปภาพ</label>
            <input type="file" accept="image/*" name="image" id="image" onChange={handleImageUpload} />
            </div>

            {/* Preview the uploaded image */}
            {/* {formData.image && (
            <div className="mt-4">
                <h2 className="text-lg font-semibold">Preview:</h2>
                <img src={formData.image} alt="Preview" className="w-48 h-32 object-cover rounded" />
            </div>
            )} */}

            <button
            type="submit"
            className="w-48 h-12 text-center bg-green-500 text-white text-xl font-bold rounded mb-4 cursor-pointer"
            >
            บันทึก
            </button>
        </form>

        {/* News Preview */}
        <div className="flex flex-col gap-4 p-4  v  mx-auto">
            <h1 className="text-2xl font-bold mt-8 text-center">ตัวอย่าง</h1>
            <NewsCard item={formData} />
        </div>
        </div>
    );
};

export default NewsForm;
