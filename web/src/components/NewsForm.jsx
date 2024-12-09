import React, { useState } from "react";
import NewsCard from "./NewsCard";

const NewsForm = () => {
    const DEFAULT_IMAGE_URL = "http://localhost/api/uploads/ex_news.png"; // URL สำหรับรูปภาพเริ่มต้น

    const [formData, setFormData] = useState({
        title: "",
        desc: "",
        linkTo: "",
        image: null,
        upload: null,
    });
    const [preview, setPreview] = useState(null);
    const [responseMessage, setResponseMessage] = useState("");

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
                    image: reader.result,
                    upload: file,
                }));
            }
            setPreview(URL.createObjectURL(file));
            reader.readAsDataURL(file);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.desc);
        data.append("linkTo", formData.linkTo);

        if (formData.upload) {
            data.append("image", formData.upload);
        } else {
            // กำหนดค่า defaultImage หากไม่มีรูปภาพ
            data.append("image", DEFAULT_IMAGE_URL);
        }

        try {
            const response = await fetch("http://localhost/api/upload.php", {
                method: "POST",
                body: data,
            });

            const result = await response.json();
            setResponseMessage(result.message);

            if (result.success) {
                // Reset form
                setFormData({
                    title: "",
                    description: "",
                    linkTo: "",
                    image: null,
                    upload: null,
                });
                setPreview(null);
            }
        } catch (error) {
            console.error("Error uploading data:", error);
            setResponseMessage("An error occurred during upload.");
        }
    };

    return (
        <div className="container mx-auto grid grid-cols-2 gap-4">
            {/* News Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border rounded">
                <h1 className="text-2xl font-bold">สร้างหัวข้อใหม่</h1>

                <div className="flex flex-col text-lg gap-2">
                    <label htmlFor="title">หัวข้อ</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="หัวข้อข่าว"
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
                        placeholder="รายละเอียดข่าว"
                        value={formData.desc}
                        onChange={handleChange}
                        className="border rounded p-1"
                    />
                </div>

                <div className="flex flex-col text-lg gap-2">
                    <label htmlFor="linkTo"> Link To</label>
                    <input 
                        type="text" 
                        name="linkTo" 
                        id="linkTo" 
                        placeholder="Link To GitBook หรือเว็บไซต์"
                        value={formData.linkTo} 
                        onChange={handleChange} 
                        className="border rounded p-1" 
                    />
                </div>

                <div className="flex flex-col text-lg gap-2">
                    <label htmlFor="image">รูปภาพ</label>
                    <input
                        type="file"
                        accept="image/*"
                        name="image"
                        id="image"
                        onChange={handleImageUpload}
                    />
                </div>

                {preview ? (
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold">ตัวอย่างรูปภาพ:</h2>
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-48 h-32 object-cover rounded"
                        />
                    </div>
                ) : (
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold">รูปภาพเริ่มต้น:</h2>
                        <img
                            src={DEFAULT_IMAGE_URL}
                            alt="Default"
                            className="w-48 h-32 object-cover rounded"
                        />
                    </div>
                )}

                <button
                    type="submit"
                    className="w-48 h-12 text-center bg-green-500 text-white text-xl font-bold rounded mb-4 cursor-pointer"
                >
                    บันทึก
                </button>
            </form>

            {/* Response Message */}
            {responseMessage && (
                <p className="text-center text-lg text-blue-500 mt-4">{responseMessage}</p>
            )}

            {/* News Preview */}
            <div className="flex flex-col gap-4 p-4 mx-auto">
                <h1 className="text-2xl font-bold mt-8 text-center">ตัวอย่าง</h1>
                <NewsCard item={formData} />
            </div>
        </div>
    );
};

export default NewsForm;
