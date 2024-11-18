import React, { useState } from 'react';
import useEncryption from "../../utils/useEncryption";

const DataEncryptionComponent = () => {
    const { encryptData, decryptData } = useEncryption();
    const [plainText, setPlainText] = useState('');
    const [encryptedText, setEncryptedText] = useState('');
    const [decryptedText, setDecryptedText] = useState('');

    const handleEncrypt = () => {
        const encrypted = encryptData(plainText);
        setEncryptedText(encrypted);
    };

    const handleDecrypt = () => {
        const decrypted = decryptData(encryptedText);
        setDecryptedText(decrypted);
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Data Encryption Example</h2>

            <div className="mb-4">
                <input
                    type="text"
                    value={plainText}
                    onChange={(e) => setPlainText(e.target.value)}
                    placeholder="Enter text to encrypt"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleEncrypt}
                    className="mt-2 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Encrypt
                </button>
            </div>

            {encryptedText && (
                <div className="mb-4">
                    <p className="text-sm font-mono bg-gray-100 p-4 rounded-lg">{encryptedText}</p>
                    <button
                        onClick={handleDecrypt}
                        className="mt-2 w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                    >
                        Decrypt
                    </button>
                </div>
            )}

            {decryptedText && (
                <div className="mt-4 p-4 bg-gray-50 border-t border-gray-200 rounded-lg">
                    <p className="text-lg text-gray-700">Decrypted Text:</p>
                    <p className="text-xl font-bold text-gray-900">{decryptedText}</p>
                </div>
            )}
        </div>
    );
};

export default DataEncryptionComponent;
