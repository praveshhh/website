/**
 * client-side End-to-End Encryption (E2EE) helper using Web Crypto API.
 * Encrypts and decrypts sensitive data directly in the browser.
 * The server only receives and stores the ciphertext, IV, and salt.
 */

// Helper: Convert ArrayBuffer to Base64 string
function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

// Helper: Convert Base64 string to ArrayBuffer
function base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

// Helper: Convert string to ArrayBuffer (UTF-8)
function stringToBuffer(str) {
    return new TextEncoder().encode(str);
}

// Helper: Convert ArrayBuffer to string (UTF-8)
function bufferToString(buffer) {
    return new TextDecoder().decode(buffer);
}

/**
 * Derives a CryptoKey from a password and salt using PBKDF2.
 * @param {string} password 
 * @param {ArrayBuffer} salt 
 * @returns {Promise<CryptoKey>}
 */
async function deriveKey(password, salt) {
    const passwordBuffer = stringToBuffer(password);
    
    // Import raw password as a key representation
    const baseKey = await window.crypto.subtle.importKey(
        "raw",
        passwordBuffer,
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );
    
    // Derive the AES-GCM 256-bit key using PBKDF2
    return window.crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: 100000,
            hash: "SHA-256"
        },
        baseKey,
        { name: "AES-GCM", length: 256 },
        false, // Key is not extractable (highly secure)
        ["encrypt", "decrypt"]
    );
}

/**
 * Encrypts plaintext using a password.
 * Generates a random salt and IV, encrypts with AES-GCM.
 * @param {string} plaintext 
 * @param {string} password 
 * @returns {Promise<{encryptedPayload: string, iv: string, salt: string}>}
 */
export async function encryptData(plaintext, password) {
    try {
        // Generate random salt (16 bytes) and IV (12 bytes for AES-GCM)
        const salt = window.crypto.getRandomValues(new Uint8Array(16));
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        
        // Derive key
        const key = await deriveKey(password, salt.buffer);
        
        // Encrypt the plaintext buffer
        const plaintextBuffer = stringToBuffer(plaintext);
        const ciphertextBuffer = await window.crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: iv
            },
            key,
            plaintextBuffer
        );
        
        // Return base64 strings
        return {
            encryptedPayload: arrayBufferToBase64(ciphertextBuffer),
            iv: arrayBufferToBase64(iv.buffer),
            salt: arrayBufferToBase64(salt.buffer)
        };
    } catch (error) {
        console.error("Encryption failed:", error);
        throw new Error("Client encryption error: " + error.message);
    }
}

/**
 * Decrypts ciphertext using password, IV, and salt.
 * @param {string} base64Ciphertext 
 * @param {string} base64Iv 
 * @param {string} base64Salt 
 * @param {string} password 
 * @returns {Promise<string>}
 */
export async function decryptData(base64Ciphertext, base64Iv, base64Salt, password) {
    try {
        const ciphertext = base64ToArrayBuffer(base64Ciphertext);
        const iv = base64ToArrayBuffer(base64Iv);
        const salt = base64ToArrayBuffer(base64Salt);
        
        // Derive key using the same salt
        const key = await deriveKey(password, salt);
        
        // Decrypt the ciphertext buffer
        const decryptedBuffer = await window.crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: new Uint8Array(iv)
            },
            key,
            ciphertext
        );
        
        // Return decrypted string
        return bufferToString(decryptedBuffer);
    } catch (error) {
        console.error("Decryption failed:", error);
        throw new Error("Client decryption error (Check your master password / key): " + error.message);
    }
}
