// api.js

import axios from "axios";

const API_URL = "http://localhost/api/getNews.php";

export const fetchNews = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.news; // สมมุติว่า API คืนค่าข้อมูลในรูปแบบ { news: [...] }
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error.response ? error.response.data : error.message;
  }
};
