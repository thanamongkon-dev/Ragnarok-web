<?php
$encryptionKey = '1234567890123456'; // 16-byte key for AES-128-CBC
$iv = '1234567890123456'; // 16-byte IV for AES-128-CBC
$encryptedPayload = 'NTaeC444DdM39nNNOnY4Q0rQXRFFR0FWzAQguNgdvvBLsIfmJIE92gFk1G13DujB1JWRIM+jephFdwy6i67D4Q=='; // replace with actual base64 encoded data

// Convert key and IV to binary
$encryptionKey = hex2bin(bin2hex($encryptionKey)); // Convert key to binary
$iv = hex2bin(bin2hex($iv)); // Convert IV to binary

// Decrypt payload
$decryptedData = openssl_decrypt(
    base64_decode($encryptedPayload),
    'aes-128-cbc',
    $encryptionKey,
    OPENSSL_RAW_DATA,
    $iv
);

if ($decryptedData === false) {
    echo "Decryption failed.";
} else {
    echo "Decrypted Data: " . $decryptedData;
}
