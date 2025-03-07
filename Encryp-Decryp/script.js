
document.getElementById('custom').addEventListener('click', setTypeOfEncryption);
document.getElementById('AES').addEventListener('click', setTypeOfEncryption);

const encryptInput = document.getElementById('encryptInput');
const encryptOutput = document.getElementById('encryptOutput');

const decryptInput = document.getElementById('decryptInput');
const decryptOutput = document.getElementById('decryptOutput');

const btnEncrypt = document.getElementById('btnEncrypt');
const btnDecrypt = document.getElementById('btnDecrypt');
const btnClear = document.getElementById('btnClear');
const type = document.getElementById('type');

const key = "qwerty";


// Select type of Encryption
function setTypeOfEncryption(event) {
    const type = document.getElementById('type');
    if (event.target.id === 'custom') {
        type.innerText = event.target.innerText;
    } else if (event.target.id === 'AES') {
        type.innerText = event.target.innerText;
    }
}

// btn Encryp
btnEncrypt.addEventListener('click', () => {
    let userInput = encryptInput.value;
    checkTypeEncryption(encryptMessage(userInput, key), encryptData(userInput), encryptOutput);
})

// btn Decrypt
btnDecrypt.addEventListener('click', () => {
    let userInput = decryptInput.value;
    checkTypeEncryption(decryptMessage(userInput, key), decryptData(userInput), decryptOutput);
    encryptedData.length = 0;
})

// btn Clear
btnClear.addEventListener('click', () => {
    encryptInput.value = "";
    encryptOutput.value = "";
    decryptInput.value = "";
    decryptOutput.value = "";
})

// check type of encryption
function checkTypeEncryption(cond1, cond2, output) {
    if (type.innerText === 'AES (Advanced Encryption Standard)') {
        output.value = cond1;
    } else {
        output.value = cond2;
    }
}



