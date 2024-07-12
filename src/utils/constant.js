import * as StellarSdk from '@stellar/stellar-sdk'; 

/* SAVE CONSTANTS VARIABLES */
export const API_URL = 'https://fundblock.live/public/api/api.php'
export const ADMIN_API_URL = 'https://fundblock.live/public/api/admin_api.php'
export const FINGERPRINT =   (function(){
    var canvas =  document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    var txt = "i9asdm..#$po(^$W%^W%&*W*09) wr-cz" + new Date(Date()).getTime()
    ctx.textBaseline = "top"
    ctx.font = "45px sans-serif"
    ctx.textBaseline = "alphabetic"
    ctx.rotate = "(.07)"
    ctx.fillStyle = "#f60"
    ctx.fillRect(125,1,62,20)
    ctx.fillStyle = "#069"
    ctx.fillText(txt,2,19)
    ctx.fillStyle = "rgba(102,200,0,0.7)"
    ctx.fillText(txt,4,17)
    ctx.shadowBlur = 9
    ctx.shadowColor = "green"
    ctx.fillRect(-20,10,234,5)
    var res = canvas.toDataURL()
    var hash = 0
    var char = ""
    ctx = null
    canvas = null
    if(res.length == 0){
        return ""
    }
    else{
        for(let i=0;i<res.length;i++){
            char = res.charCodeAt(i)
            hash = ((hash << 5) - hash) + char
            hash = hash & hash
        }
        hash = hash + "GA"
        return hash.replace(/[^0-9A-Z]/g,"")
    }
    
})()
export const PROFILE_LOGO = "https://www.shutterstock.com/image-vector/confident-smiling-coach-man-wearing-600nw-2304634725.jpg"
export const MAX_SIZE_EXCEEDED = 10 * 1024 * 1024;

/* STELLARS */
export const SorobanClient = StellarSdk.SorobanRpc
export const timeout = 86400 //using a timeout of one day
export const fee = 100;
export const stellarServer = "https://soroban-testnet.stellar.org"
export const ContractId = 'CDHNOK3YAFGEWMINSJOC2VDVN5A7LDQL762KGTXQGB7AJU2KU62FZD7A'  
export const FETCH_ADDRESS = 'GA7UJ5VGEHID3SQ7MLQ27MGKTRSFFROX5AJM4AREU7LK775IT7WB4NF3'
export const networkUsed = StellarSdk.Networks.TESTNET
export const networkWalletUsed = "TESTNET"
export const contract = new StellarSdk.Contract(ContractId);
   

 