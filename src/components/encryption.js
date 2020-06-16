var crypto = require('crypto'); 
const QuickEncrypt = require('quick-encrypt')
const CryptoJS = require("crypto-js");

function generateRSAKeys() {
    let keys = QuickEncrypt.generate(1024) // Use either 2048 bits or 1024 bits.
    console.log("Keys generated: " ,keys) // Generated Public Key and Private Key pair
    return keys
}

function encryptRSA(text, publicKey) {
    let encryptedText = QuickEncrypt.encrypt(text, publicKey)
    return encryptedText
}


function decryptRSA(text, privateKey) {
    let decryptedText = QuickEncrypt.decrypt(text, privateKey)
    return decryptedText
}

function generateSecretKey() {
    const secretKey = crypto.randomBytes(32);
    console.log("SecretKey: ", secretKey);
    return secretKey;
}  

function callEncrypt(argument, key) {
    const wordArray = CryptoJS.lib.WordArray.create(argument);
    const str = CryptoJS.enc.Hex.stringify(wordArray);
    const ct = CryptoJS.AES.encrypt(str, key);
    const ctstr = ct.toString();
    return ctstr;
}

function callDecrypt(enctext, key) {
    var str = uintToString(enctext)
    const decrypted = CryptoJS.AES.decrypt(str, key)
    str = decrypted.toString(CryptoJS.enc.Utf8);
    const wordArray = CryptoJS.enc.Hex.parse(str);
    const BaText = wordArrayToByteArray(wordArray, wordArray.length);
    return(BaText);
}

function uintToString(uintArray) {
    var decodedStr = new TextDecoder("utf-8").decode(uintArray);
    return decodedStr;
}

function wordToByteArray(word, length) {
	var ba = [],
		xFF = 0xFF;
	if (length > 0)
		ba.push(word >>> 24);
	if (length > 1)
		ba.push((word >>> 16) & xFF);
	if (length > 2)
		ba.push((word >>> 8) & xFF);
	if (length > 3)
		ba.push(word & xFF);

	return ba;
}

function wordArrayToByteArray(wordArray, length) {
	if (wordArray.hasOwnProperty("sigBytes") && wordArray.hasOwnProperty("words")) {
		length = wordArray.sigBytes;
		wordArray = wordArray.words;
	}

	var result = [],
		bytes,
		i = 0;
	while (length > 0) {
		bytes = wordToByteArray(wordArray[i], Math.min(4, length));
		length -= bytes.length;
		result.push(bytes);
		i++;
	}
	return [].concat.apply([], result);
}

module.exports.generateRSAKeys = generateRSAKeys;
module.exports.generateSecretKey = generateSecretKey;
module.exports.encryptRSA = encryptRSA;
module.exports.decryptRSA = decryptRSA;
module.exports.callEncrypt = callEncrypt;
module.exports.callDecrypt = callDecrypt;