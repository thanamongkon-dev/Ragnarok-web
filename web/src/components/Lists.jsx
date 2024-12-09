import React, { useState } from "react";

const Lists = ({ list }) => {
  const [data, setData] = useState(list);

  const handleInputChange = (e, index, key) => {
    const updatedData = [...data];
    updatedData[index][key] = e.target.textContent; // อัปเดตค่าที่เปลี่ยน
    setData(updatedData);
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedData = [...data];
        updatedData[index].image = reader.result; // อัปเดต URL รูปภาพใหม่
        setData(updatedData);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveChanges = () => {
    console.log("Updated Data: ", data);
    // ส่งข้อมูลที่เปลี่ยนไปยัง API หรือเซิร์ฟเวอร์ที่นี่
  };

  return (
    <>
      {data.map((item, index) => (
        <div
          className="container flex justify-between hover:bg-gray-200 border px-4 py-2"
          key={index}
        >
          <div className="flex gap-4">
            <img
              // http://localhost:5173/src/assets/event/${item.image}
              src={item.image}
              className="w-[64px] object-contain"
              alt="banner"
            />
            <div className="row">

              <div className="flex space-x-2">
                <label htmlFor="title"> หัวข้อ : </label>
                <p
                  contentEditable="true"
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleInputChange(e, index, "title")}
                >
                  {item.title}
                </p>
              </div>

              <div className="flex space-x-2">
                <label htmlFor="description"> รายละเอียด :</label>
                <p>{item.description}</p>
              </div>
              <div className="col-md-6">
                <p>{item.time}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            {/* <label className="bg-blue-500 text-white rounded max-h-fit min-w-20 px-4 py-2 cursor-pointer">
              อัปโหลดรูป
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, index)}
              />
            </label> */}
            <div className="bg-green-500 text-center text-white rounded max-h-fit min-w-20 px-4 py-2">เปิดเผย</div>
            <div className="bg-red-500 text-center text-white rounded max-h-fit min-w-20 px-4 py-2">
              ลบ
            </div>
          </div>
        </div>
      ))}

      <div className="mt-4">
        <button
          className="bg-green-500 text-white rounded px-4 py-2"
          onClick={saveChanges}
        >
          บันทึกการเปลี่ยนแปลง
        </button>
      </div>
    </>
  );
};

export default Lists;
