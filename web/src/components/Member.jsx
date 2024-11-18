import React, { useLayoutEffect, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // If you're using react-router
import PackageCard from "../pages/PackageCard.jsx";
import useDonate from "../hooks/useDonate.js";
import useLogin from "../hooks/useLogin";
import useGetCash from "../hooks/useGetCash";
import PaymentHistory from "./PaymentHistory.jsx";

const Member = () => {
  const [user, setUser] = useState(null);
  const [cash, setCash] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showdonate, setShowdonate] = useState(true);

  const navigate = useNavigate(); // For navigation if needed
  const { donate } = useDonate();
  const { getCash } = useGetCash();
  const { logout } = useLogin();

  useEffect(() => {
    const handleReload = () => {
      const userData = JSON.parse(localStorage.getItem("user"));

      if (userData) {
        setUser(userData);
        fetchCash(userData.account_id);
      } else {
        navigate("/home");
      }
    };

    // Call on mount
    handleReload();

    // Call on reload or close
    window.addEventListener("beforeunload", handleReload);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("beforeunload", handleReload);
    };
  }, [navigate]);

  const fetchCash = async (account_id) => {
    try {
      setLoading(true);
      const data = await getCash(account_id);
      setCash(data);
    } catch (err) {
      setError("Failed to fetch cash data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>; // Loading state
  if (error) return <p>{error}</p>; // Error state
  if (!user) return <p>No user data</p>; // Handle case if user is null

  const donateInfo = [
    {
      price: 100,
      cash: 1000,
      bonusItems: "Donate Box 1 ea",
    },
    {
      price: 200,
      cash: 2000,
      bonusItems: "Donate Box 2 ea",
    },
    {
      price: 300,
      cash: 3000,
      bonusItems: "Donate Box 3 ea",
    },
    {
      price: 500,
      cash: 5000,
      bonusItems: "Donate Box 5 ea",
    },
    {
      price: 1000,
      cash: 10000,
      bonusItems: "Donate Box 10 ea",
    },
    {
      price: 2000,
      cash: 20000,
      bonusItems: "Donate Box 20 ea",
    },
  ];

  return (
    <div className="flex flex-col items-center p-4 bg-slate-800 min-h-screen w-full">
      <div className="flex flex-col bg-gray-100 p-6 sm:p-8 md:p-10 lg:p-12 w-full sm:w-4/5 lg:w-3/4 xl:w-2/3 items-center rounded-md">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Member</h1>
        <h6 className="text-lg mb-6">บัญชีผู้ใช้ : {user.userid}</h6>
        <nav className="w-full flex flex-wrap bg-gray-500 items-center justify-between p-2 rounded-md">
          <ul className="flex flex-wrap space-x-2 sm:space-x-4 items-center text-white">
            <li>
              <button onClick={() => setShowdonate(true)} className="p-2">
                เติมเงิน
              </button>
            </li>
            <li>
              <button onClick={() => setShowdonate(false)} className="p-2">
                ประวัติการเติมเงิน
              </button>
            </li>
          </ul>
          <button
            onClick={logout}
            className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 mt-2 sm:mt-0"
          >
            Logout
          </button>
        </nav>
        <div className="w-full flex flex-col sm:flex-row my-6 space-y-4 sm:space-y-0 sm:space-x-4 overflow-hidden">
          <div className="flex w-full items-center p-4 bg-white shadow rounded">
            <span className="text-xl mr-2">
              {/* SVG icon */}
            </span>
            <input
              type="text"
              value={`Cash Point: ${cash.Cash || 0} แต้ม`}
              readOnly
              className="flex-grow text-center text-lg sm:text-xl font-bold cursor-default"
            />
          </div>
          <div className="flex w-full items-center p-4 bg-white shadow rounded">
            <span className="text-xl mr-2">
              {/* SVG icon */}
            </span>
            <input
              type="text"
              value={`Bonus Point: ${cash.Bonus || 0} แต้ม`}
              readOnly
              className="flex-grow text-center text-lg sm:text-xl font-bold cursor-default"
            />
          </div>
        </div>

        {/* Donate */}
        <div className={`w-full ${showdonate ? "block" : "hidden"}`}>
          <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-center">
              <tr>
                <th className="px-2 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">
                  โอนเงิน QR Code
                </th>
                <th className="px-2 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Cash
                </th>
                <th className="px-2 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">
                  ของแถม
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-center">
              {donateInfo.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-300 cursor-pointer"
                  onClick={() => donate(user.userid, item.price, user.account_id)}
                >
                  <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.price} บาท
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.cash} Cash
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.bonusItems}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <PackageCard />
        </div>

        {/* Payment History */}
        <div className={`w-full ${showdonate ? "hidden" : "block"}`}>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
            Payment History
          </h1>
          <PaymentHistory Accid={user.account_id} />
        </div>
      </div>
    </div>
  );
};

export default Member;
