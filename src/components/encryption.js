var crypto = require('crypto'); 
const QuickEncrypt = require('quick-encrypt')


const CryptoJS = require("crypto-js");
function callEncrypt(argument, key) {
    console.log("In call encrypt");
  const wordArray = CryptoJS.lib.WordArray.create(argument);
  console.log("Word array: ", wordArray);
  console.log("Word array type: ", typeof wordArray);
  const str = CryptoJS.enc.Hex.stringify(wordArray);
  console.log("Type of str: ", typeof str);
  const ct = CryptoJS.AES.encrypt(str, key);
  console.log("ct: ",ct);
  const ctstr = ct.toString();
  return ctstr;
}

function callDecrypt(enctext, key) {
    var str = uintToString(enctext)
    const decrypted = CryptoJS.AES.decrypt(str, key);
    console.log("Decrypted type: ",typeof decrypted);
    str = decrypted.toString(CryptoJS.enc.Utf8);
    const wordArray = CryptoJS.enc.Hex.parse(str);
    console.log("Word array: ",wordArray);
    console.log("Word array type: ", typeof wordArray);
    const BaText = wordArrayToByteArray(wordArray, wordArray.length);
    console.log("BaText: ",BaText);
    console.log("BaText type: ", typeof BaText);
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

// const generateKeys = () => {
//     console.log("In generate function");
//     crypto.generateKeyPair('rsa', {
//         modulusLength: 4096,
//         publicKeyEncoding: {
//           type: 'spki',
//           format: 'pem'
//         },
//         privateKeyEncoding: {
//           type: 'pkcs8',
//           format: 'pem',
//           cipher: 'aes-256-cbc', 
//           passphrase: ''
//         }
//     }, (err, publicKey, privateKey) => {
//         pbKey = publicKey,
//         prKey = privateKey
//     })
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             let error = false;
//             if(!error)
//                 resolve({ publicKey: pbKey, privateKey: prKey })
//             else
//                 reject()
//         }, 2000)     
//     })
// }


function generateSecretKey() {
    const secretKey = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    console.log("SecretKey: ", secretKey, "\niv: ", iv);
    return {secretKey: secretKey, iv: iv};
}  

function encryptAES(text, secretKey, iv) {
   let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
   let encrypted = cipher.update(text);
   encrypted = Buffer.concat([encrypted, cipher.final()]);
   return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decryptAES(text, secretKey ,iv) {
   console.log("type of text: ",typeof text);
   console.log("type of secretKey: ",typeof secretKey);
   console.log("type of iv: ",typeof iv);
   let ivBuffer = Buffer.from(iv, 'hex');
   let encryptedText = Buffer.from(text, 'hex');
   let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey), ivBuffer);
   let decrypted = decipher.update(encryptedText);
   decrypted = Buffer.concat([decrypted, decipher.final()]);
   return decrypted.toString();
}

module.exports.generateRSAKeys = generateRSAKeys;
module.exports.generateSecretKey = generateSecretKey;
module.exports.encryptAES = encryptAES;
module.exports.decryptAES = decryptAES;
module.exports.encryptRSA = encryptRSA;
module.exports.decryptRSA = decryptRSA;
module.exports.callEncrypt = callEncrypt;
module.exports.callDecrypt = callDecrypt;