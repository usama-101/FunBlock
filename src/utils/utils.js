/* UTILITY SCRIPTS */

import Swal from "sweetalert2";
import CryptoJS  from 'crypto-js'; 
import { FINGERPRINT, MAX_SIZE_EXCEEDED } from "./constant";
import { getPublicKey, isConnected, setAllowed } from "@stellar/freighter-api";

//the E operator
export const E = (elementId) => {return document.getElementById(elementId)}
//to validate password
export const validatePass = (pass_field) => {
    const pass = E(pass_field)
    const password = pass.value; 
    let pass_flg = true
    // Check if the password contains a symbol
    var symbolRegex = /[$&+,:;=?@#|'<>.^*()%!-]/;
    if (!symbolRegex.test(password)) {
        pass_flg = pass_flg && false;
    }
    // Check if the password contains a number
    var numberRegex = /\d/;
    if (!numberRegex.test(password)) {
        pass_flg = pass_flg && false;
    }
    // Check if the password contains an uppercase letter
    var uppercaseRegex = /[A-Z]/;
    if (!uppercaseRegex.test(password)) {
        pass_flg = pass_flg && false;
    }
    // Check if the password contains a lowercasee letter
    var uppercaseRegex = /[a-z]/;
    if (!uppercaseRegex.test(password)) {
        pass_flg = pass_flg && false;
    }
    // Check if the password is at least 8 in length
    var uppercaseRegex = /[A-Z]/;
    if (password.length < 8) {
        pass_flg = pass_flg && false;
    }
    
    if(pass_flg) {
        pass.style.border = ""
    }
    else if(!pass_flg) {  
        pass.style.border = "2px solid red !important"
    }
    return pass_flg
}
//alert msg
export const msg = (msg, type='good') => {
    if(type == 'good') {
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: msg,
        });
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: msg,
          });
    }
}
//to save token
export const saveToken = (token) => {
    if(token) {  
        token = CryptoJS.AES.encrypt(token, FINGERPRINT)
        localStorage.setItem('x-api-key', token)
    }
}
//to retreive token
export const getToken = () => {
    const token = localStorage.getItem('x-api-key') || ''
    if(token != "") {
        return CryptoJS.AES.decrypt(token, FINGERPRINT).toString(CryptoJS.enc.Utf8);
    }
}
//to format address
export const fAddr = (address = "", len = 5) => {
    if(address != "") {
        return address.substring(0, len) + '...' + address.substring(address.length - len)
    }
    return ""
}
//to format number
export const fNum = (num) => {
    if (num >= 1e9) {
        return (num / 1e9).toFixed(1) + 'B';
    } else if (num >= 1e6) {
        return (num / 1e6).toFixed(1) + 'M';
    } else if (num >= 1e3) {
        return (num / 1e3).toFixed(1) + 'K';
    } else {
        return num.toString();
    }
}
//to return connected wallet address
export const getWallet = async () => {
    const isConnect = localStorage.getItem('x-wallet-connect') || 'false'
    const walletType = localStorage.getItem('x-wallet-type') || 'freighter'
    if(isConnect == 'true') {
        if(walletType == 'freighter') {
        try{
            //check if user has freighter installed
            for(let i=0;i<30;i++){ //do it ten times, because freighter dey kolo
                const flg = await  isConnected();
                if(flg) {
                    if((await setAllowed())){ 
                        //has connected
                        return (await getPublicKey())
                    }
                    else {
                        return ""
                    }
                }
            }
        }
        catch(e) {
            return ""
        }
        }
        else if(walletType == 'rabet') {
        if(window.rabet) {
            try{
                const res = await window.rabet.connect()
                if(res) {
                    return res.publicKey
                }
                else{return ""}
            }catch(e) {return ""}
        }
        else {
        return ""
        }
        }
    }
    return ""
}
//to return auth headers
export const AUTH_HEADERS = (formData = new FormData) => {
    formData.append('Authorization', `Bearer ${getToken()}`);
    return  formData;
}
//image selector
export const selectImage = (callback) => {
    const img = document.createElement('input')
    img.type = 'file'
    img.accept = 'image/*';
    img.style.display = 'none'
    img.addEventListener('change', function(event) {  
        const file = event.target.files[0];
        if(file != null) {
            if (file && file.size > MAX_SIZE_EXCEEDED) {
                callback(1)
                img.value = ''; // Clear the file input
            }
            else {
                callback(file)
            }
        }
        else {
            callback("")
        }
    });
    document.body.appendChild(img)
    return img;
}
//the onrender operator
export const onRender = (elementId, callback, timeout = 5) => {
    const tmrId = setInterval(() => {
        if(E(elementId)){clearInterval(tmrId);callback()}
    }, 50)
    setTimeout(() => {clearInterval(tmrId)}, timeout * 1000)
    return tmrId
}
//to validate uri
export const isURL = (uri = "") => {
    try {
      if(uri.trim() != "") {
        if(uri.indexOf(':/') == -1 && uri.indexOf(".") > -1) {uri = 'http://' + uri} //append protocol
        new URL(uri)
      }
      return true;
    } catch (err) {  
      return false;
    }
}
//to redirect to a link
export const goTo = (url) => {window.location = url}