import axios from "axios";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const PaymentHistory = ({ Accid }) => {
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    donateInfo(Accid);
  }, [Accid]);

  async function donateInfo(accountId) {
    try {
      const response = await axios.get(
        `http://localhost/api/getPayment.php?accountId=${accountId}`
      );
      const sortedPayments = response.data.sort((a, b) =>
        new Date(b.added_time) - new Date(a.added_time)
      );
      setPayment(sortedPayments);
    } catch (error) {
      setError('Failed to fetch payment data');
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="table min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-center">
          <tr>
            <th className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">
              รายการ
            </th>
            <th className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">
              ประเภท
            </th>
            <th className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">
              จำนวน
            </th>
            <th className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">
              วันที่
            </th>
            <th className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">
              สถานะ
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-center">
          {payment && payment.map((item, index) => (
            <tr key={uuidv4()} className="hover:bg-gray-300 cursor-pointer">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.price} บาท
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(item.added_time)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.status === "02" || item.status === "00"
                  ? "ชําระเงินแล้ว"
                  : "รอชําระเงิน"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
