
const crypto = require('crypto'),
    resizedIV = Buffer.allocUnsafe(16),
    iv = crypto
        .createHash("sha256")
        .update("myHashedIV")
        .digest();

iv.copy(resizedIV);
const passEncrypt = "d5ed73905fdc47d078b3edcdd5d48c229ee6559cff5cc161fd9ef68720daa650";

function encrypt(password) {
    const key = crypto
        .createHash("sha256")
        .update("popcorn")
        .digest(),
        cipher = crypto.createCipheriv("aes256", key, resizedIV),
        msg = [];

    msg.push(cipher.update(password, "binary", "hex"));


    msg.push(cipher.final("hex"));
    return msg.join("");
}
function decrypt(password) {
    const key = crypto
        .createHash("sha256")
        .update("popcorn")
        .digest(),
        decipher = crypto.createDecipheriv("aes256", key, resizedIV),
        msg = [];

    msg.push(decipher.update(password, "hex", "binary"));

    msg.push(decipher.final("binary"));
    return msg.join("");
}
module.exports = { encrypt, decrypt, passEncrypt };