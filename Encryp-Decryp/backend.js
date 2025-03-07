
// Declaring a Value
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const symbols = "!@#$^&_+-*/%=(){}[]<>:;,./|`'";
const numbers = "0123456789";
const space = " ";

// Declaring an array of keys
const upperCaseKey = [];
const lowerCaseKey = [];
const symbolsKey = [];
const numbersKey = [];
const spaceKey = ['S`p$a/ce'];
const lineKey = ['l!i#n*e^'];
const encryptedData = [];

// Generate keys
createKey(upperCase, upperCaseKey);
createKey(lowerCase, lowerCaseKey);
createKey(symbols, symbolsKey);
createKey(numbers, numbersKey);

// Create Keys
function createKey(value, keys) {
    for (let i = 0; i < value.length; i++) {
        let key = getRandomChar(upperCase) + getRandomChar(symbols)
            + getRandomChar(numbers) + getRandomChar(lowerCase)
            + getRandomChar(symbols) + getRandomChar(numbers)
            + getRandomChar(lowerCase) + getRandomChar(upperCase)
        keys.push(key)
    }
}

// Get Random Characters
function getRandomChar(value) {
    return value[getRandomInt(0, value.length - 1)]
}

// Get Random Numbers
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// Encrypt the Data
function encryptData(value) {
    let keyValue = ""
    for (let i = 0; i < value.length; i++) {
        if (value[i] === '\n') {
            keyValue += lineKey[0];
        } else {
            keyValue += checkCharacterType(value[i]);
        }
    }
    return keyValue
}

// Check Character type
function checkCharacterType(char) {
    if (char.toUpperCase() === char && char.toLowerCase() !== char) {
        return getIndexKey(char, upperCase, upperCaseKey)
    } else if (char.toLowerCase() === char && char.toUpperCase() !== char) {
        return getIndexKey(char, lowerCase, lowerCaseKey)
    } else if (!isNaN(parseInt(char))) {
        return getIndexKey(char, numbers, numbersKey)
    } else if (/\s/.test(char)) {
        return getIndexKey(char, space, spaceKey)
    } else {
        return getIndexKey(char, symbols, symbolsKey)
    }
}

// Get the index key
function getIndexKey(index, key, value) {
    let indexValue = key.indexOf(index)
    return value[indexValue]
}

// Decrypt the Data
function decryptData(encData) {
    let encryptedKey = ""
    for (let i = 0; i < encData.length; i++) {
        encryptedKey += encData[i]
        if (encryptedKey.length == 8) {
            encryptedData.push(encryptedKey)
            // Check if the keys is Valid
            if (upperCaseKey.indexOf(encryptedKey) === -1
                && lowerCaseKey.indexOf(encryptedKey) === -1
                && numbersKey.indexOf(encryptedKey) === -1
                && spaceKey.indexOf(encryptedKey) === -1
                && symbolsKey.indexOf(encryptedKey) === -1
                && lineKey.indexOf(encryptedKey) === -1) {
                return "Opps! Invalid Format."
            }
            encryptedKey = ""
        }
    }
    return decryptedKey()
}

// Get the Decrypted key value
function decryptedKey() {
    let decryptedData = ""
    for (let i = 0; i < encryptedData.length; i++) {
        if (encryptedData[i] === lineKey[0]) {
            decryptedData += '\n'
        }
        decryptedData
            += checkIfIndexExist(upperCaseKey, encryptedData[i], upperCase)
            + checkIfIndexExist(lowerCaseKey, encryptedData[i], lowerCase)
            + checkIfIndexExist(numbersKey, encryptedData[i], numbers)
            + checkIfIndexExist(spaceKey, encryptedData[i], space)
            + checkIfIndexExist(symbolsKey, encryptedData[i], symbols)
    }
    return decryptedData
}

// Check if the index value is exist
function checkIfIndexExist(key, index, value) {
    let data = ""
    if (key.indexOf(index) !== -1) {
        data = getIndexKey(index, key, value)
    }
    return data
}

// AES Encryption Functions
function encryptMessage(message, key) {
    return CryptoJS.AES.encrypt(message, key, { mode: CryptoJS.mode.CTR }).toString();
}

// AES Decryption Functions
function decryptMessage(encryptedMessage, key) {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedMessage, key, { mode: CryptoJS.mode.CTR });
    let result = decryptedBytes.toString(CryptoJS.enc.Utf8);
    if (result) {
        return result;
    }
    return "Opps! Invalid Format.";
}