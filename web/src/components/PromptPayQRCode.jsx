import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import generatePayload from 'promptpay-qr';
import axios from 'axios';

const PromptPayQRCode = () => {
    const [amount, setAmount] = useState(1); // Default to 1 for test
    const [transactionId, setTransactionId] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState('pending'); // Default to pending
    const [qrCodeValue, setQrCodeValue] = useState(''); // State to hold the QR code value
    const phoneNumber = '0640081644';

    // Handle amount change and convert it to a number
    const handleAmountChange = (e) => {
        setAmount(Number(e.target.value));
    };

    // Generate QR code payload
    useEffect(() => {
        if (amount > 0) {
            // Generate a unique transaction ID for this QR code
            const newTransactionId = Date.now().toString(); // Replace with a unique ID in production
            setTransactionId(newTransactionId);

            // Generate QR code value and set it
            const payload = generatePayload(phoneNumber, { amount });
            setQrCodeValue(payload);
        }
    }, [amount, phoneNumber]);

    // Function to check payment status
    const checkPaymentStatus = async () => {
        if (transactionId) {
            try {
                const response = await axios.get(`http://localhost/api/payment_status.php?transactionId=${transactionId}`);
                setPaymentStatus(response.data.status);
            } catch (error) {
                console.error('Error fetching payment status:', error);
            }
        }
    };

    useEffect(() => {
        // Poll for payment status every 10 seconds
        const intervalId = setInterval(checkPaymentStatus, 10000); // Poll every 10 seconds
        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [transactionId]);

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-4">PromptPay QR Code Generator</h1>
            <select
                value={amount}
                onChange={handleAmountChange}
                className="mb-4 p-2 border rounded"
            >
                {[1, 50, 100, 150, 200, 300, 500, 1000, 2000, 3000, 4000, 5000, 10000].map((amt) => (
                    <option key={amt} value={amt}>
                        ฿{amt}
                    </option>
                ))}
            </select>
            <QRCode
                value={qrCodeValue} // Use the state value here
                size={256}
                includeMargin
                renderAs="svg"
            />
            <p className="mt-4">Pay ฿{amount} to {phoneNumber}</p>
            <p className="mt-4">Payment Status: {paymentStatus}</p>
        </div>
    );
};

export default PromptPayQRCode;
