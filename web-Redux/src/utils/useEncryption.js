// useEncryption.js
import CryptoJS from 'crypto-js';

const useEncryption = () => {
  const encryptionKey = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16-byte key
  const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16-byte IV

  const encryptData = (data) => {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      encryptionKey,
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    );
    return encrypted.toString(); // Return base64 encoded string
  };

  const decryptData = (encryptedPayload) => {
    const decrypted = CryptoJS.AES.decrypt(
      encryptedPayload,
      encryptionKey,
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    );
    const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  };

  return { encryptData, decryptData };
};

export default useEncryption;
