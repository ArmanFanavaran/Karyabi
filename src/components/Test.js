// import {useEffect} from 'react';
//
// var CryptoJS = require("crypto-js");
// var aesjs = require("aes-js");
//
// export default function () {
//
//     useEffect(function () {
//
//
//         let text = "{\"name\":\"ali123\"}"
//
//         var key = CryptoJS.enc.Utf8.parse('8080808080808080');
//         var iv = CryptoJS.enc.Utf8.parse('8080808080808080');
//
//         /*********** Encryption ***********/
//
//         var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text), key,
//             {
//                 keySize: 128 / 8,
//                 iv: iv,
//                 mode: CryptoJS.mode.CBC,
//                 padding: CryptoJS.pad.Pkcs7
//             });
//
//         console.log("TEST")
//         console.log(encrypted.ciphertext)
//         let enc = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
//         console.log(enc)
//
//
//         /*********** Decryption ***********/
//
//         var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
//             iv: iv
//         });
//         console.log(decrypted);
//         let dec = CryptoJS.enc.Utf8.stringify(decrypted)
//         console.log(dec);
//         // let dec = CryptoJS.de
//         // console.log(encryptedlogin.ciphertext.toString(CryptoJS.enc.Utf8))
//         // console.log(CryptoJS.enc)
//
//
//         // var textBytes = aesjs.utils.hex.toBytes(text);
//         // let textBytesWithPadding = aesjs.padding.pkcs7.pad(textBytes)
//         // //
//         // //
//         // let key = aesjs.utils.utf8.toBytes("wo5cnsu83p9w6g81ep72b2fm")
//         // let iv = aesjs.utils.utf8.toBytes("fqp8ysu8329wsgpv")
//         // //
//         // // let test = "E/EmM5bfy9rEs2zwWM9GVEkS/+OcuHN68HRgHeh0xao="
//         // // console.log(aesjs.padding)
//         // // console.log(test.length )
//         // var aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
//         // var decryptedBytes = aesCbc.decrypt(textBytes);
//         //
//         // var encryptedBytes = aesCbc.encrypt(textBytesWithPadding);
//         // var encryptedHex = aesjs.utils.utf8.fromBytes(encryptedBytes);
//         // var encryptedHex =  Data({bytes: UnsafePointer<UInt8>(encrypted), count: Int(encrypted.count))
//
//         //
//         // console.log(key);
//
//         // console.log(encryptedHex);
//
// //         var encBytes = aesjs.utils.hex.toBytes(encryptedHex);
// //         let encBytesWithPadding = aesjs.padding.pkcs7.pad(encBytes)
// //
// //         var decryptedBytes = aesCbc.decrypt(encBytesWithPadding);
// //
// // // Convert our bytes back into text
// //         var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
// //         console.log(decryptedText);
//
//
//
//         // var key = CryptoJS.enc.Hex.parse("wo5cnsu83p9w6g81ep72b2fm");
//         // var iv = CryptoJS.enc.Hex.parse("fqp8ysu8329wsgpv");
//         // var decrypted = CryptoJS.AES.decrypt(text, key, {iv: iv});
//         // console.log("TEST");
//
//
//
//         // let result = bin2String(decrypted.words); // "foo"
//
//         // var encryptedHex = aesjs.utils.utf8.fromBytes(decrypted.words);
//
//         // console.log(decryptedText);
// 0
//         // let jsonStr = '{"something":"else"}';
//         // var encrypted = CryptoJS.AES.encrypt(jsonStr, 'youngunicornsrunfree');
//         // // var decrypted = CryptoJS.AES.decrypt(encrypted, "youngunicornsrunfree");
//         // console.log("TEST");
//         // console.log(encrypted)
//         // console.log(decrypted.toString(CryptoJS.enc.Utf8));
//
//
//     }, []);
//
//     return <div></div>
// }