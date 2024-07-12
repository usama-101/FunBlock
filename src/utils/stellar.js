/* Stellar Functions */
import { SorobanClient, networkUsed, networkWalletUsed, stellarServer, fee, timeout, contract, FETCH_ADDRESS } from "./constant"
import {
    signTransaction,
} from "@stellar/freighter-api";
import * as StellarSdk from '@stellar/stellar-sdk'; 
import { addTx } from "./api";
import { fAddr } from "./utils";


/** To execute a transaction
    * @params {transactionObject}
    * @params {callBack}
**/
const execTranst = async (transaction = "") => {
    if(transaction !== "") {
        //prepare xdr
        const server = new SorobanClient.Server(stellarServer); 
        let xdr = await transaction.toXDR();
        try {
            const walletType = localStorage.getItem('x-wallet-type') || 'freighter'
            if(walletType == 'freighter'){
                xdr = await signTransaction(xdr, networkWalletUsed) //sign with freighter
            }
            else { //rabet
                xdr = await rabet.sign(xdr, networkWalletUsed.toLowerCase())
            }
            //recreate signed transaction
            transaction = new StellarSdk.Transaction(xdr, networkUsed)
            let sendResponse = await server.sendTransaction(transaction);
            console.log(`Sent transaction: ${JSON.stringify(sendResponse)}`);
            if (sendResponse.status === "PENDING") {
              let getResponse = await server.getTransaction(sendResponse.hash);
              // Poll `getTransaction` until the status is not "NOT_FOUND"
              while (getResponse.status === "NOT_FOUND") {
                // See if the transaction is complete
                getResponse = await server.getTransaction(sendResponse.hash);
                // Wait one second
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }
              if (getResponse.status === "SUCCESS") {
                // Make sure the transaction's resultMetaXDR is not empty
                if (!getResponse.resultMetaXdr) {
                   return {status:true, msg:""}
                }
                // Find the return value from the contract and return it
                
                //let transactionMeta = getResponse.resultMetaXdr;
                let returnValue = getResponse.returnValue
                return {status:true, value: returnValue, hash: sendResponse.hash}
              } else { 
                return {status:false}
              }
            } else {
               return {status:false}
            }
      } catch (err) {
        // Catch and report any errors we've thrown
        console.log("Sending transaction failed", err);
        return {status:false}
    }
}
}
/** This function creates the campaign
     * @params {paramsObject {name, owner, id, start, end}
     * returns {statusBoolean}
**/
export const createCampaign = async (params = {}, walletAddress) => {
    try{
        if(walletAddress != "") {
            const server = new SorobanClient.Server(stellarServer); 
            const account = await server.getAccount(walletAddress);
            //preparing arguements
            let _walletAdr = new StellarSdk.Address(walletAddress);_walletAdr = _walletAdr.toScVal()
            const id = StellarSdk.nativeToScVal(params.id * 1)
            const start = StellarSdk.nativeToScVal((params.start * 1))
            const end = StellarSdk.nativeToScVal((params.end * 1))
            let transaction = new StellarSdk.TransactionBuilder(account, { fee, networkPassphrase: networkUsed })
                .addOperation(
                    // An operation to call create on the contract
                    contract.call("create", _walletAdr, id, start, end)
                 )
                 .setTimeout(timeout)
                 .addMemo(StellarSdk.Memo.text('Creating Campaign'))
                 .build();
            // Simulate the transaction to discover the storage footprint, and update the
            transaction = await server.prepareTransaction(transaction);
            //sign and exec transactions
            const res = await execTranst(transaction)
            if(res.status === false) {
                //something went wrong
                return false
            }
            else {
                const resp = {status: (StellarSdk.scValToNative(res.value))}
                if(resp.status == 'done') {
                    //save the tx first 
                    await addTx({ 
                        address:walletAddress,
                        msg:"created new campaign with address " + fAddr(walletAddress, 6),
                        hash:res.hash,
                        data:params.id
                    })
                }
               return resp
            }
        }
        else {return false}
    }
    catch(e) {console.log(e); return false}
}
/** This function retrieves
     * the list of Campaigns
     * returns @map | []
**/ 
export const getCampaignsChain =  async () => {
    if(FETCH_ADDRESS != "") {
        try{
            const server = new SorobanClient.Server(stellarServer); 
            const account = await server.getAccount(FETCH_ADDRESS);
            let transaction = new StellarSdk.TransactionBuilder(account, { fee, networkPassphrase:networkUsed})
                .addOperation(
                    contract.call("get_campaigns")
                )
                .setTimeout(timeout) //using a time out of a hour
                .build();
            //Simulate the transaction to discover the storage footprint, and update the
            transaction = await server.prepareTransaction(transaction);
            let transactionMeta = (await server.simulateTransaction(transaction))
            return await StellarSdk.scValToNative(transactionMeta.result.retval);
        }
        catch(e) {
            console.log(e)
            return []}
    }
    else {return []}
} 
/** This function retrieves
     * the Campaign data
     * returns @map | []
**/ 
export const getCampaignChain =  async (campaign) => {
    if(FETCH_ADDRESS != "") {
        try{
            const server = new SorobanClient.Server(stellarServer); 
            const account = await server.getAccount(FETCH_ADDRESS);
            const id = StellarSdk.nativeToScVal(campaign * 1)
            let transaction = new StellarSdk.TransactionBuilder(account, { fee, networkPassphrase:networkUsed})
                .addOperation(
                    contract.call("get_campaign", id)
                )
                .setTimeout(timeout) //using a time out of a hour
                .build();
            //Simulate the transaction to discover the storage footprint, and update the
            transaction = await server.prepareTransaction(transaction);
            let transactionMeta = (await server.simulateTransaction(transaction))
            return await StellarSdk.scValToNative(transactionMeta.result.retval);
        }
        catch(e) {
            console.log(e)
            return []}
    }
    else {return []}
}
/** This function retrieves
     * arrayof Campaign data
     * returns @map | []
**/ 
export const getAllCampaignsChain =  async (campaign =[]) => {
    if(FETCH_ADDRESS != "") {
        try{
            const server = new SorobanClient.Server(stellarServer); 
            const account = await server.getAccount(FETCH_ADDRESS);
            const ids = StellarSdk.nativeToScVal(campaign)
            let transaction = new StellarSdk.TransactionBuilder(account, { fee, networkPassphrase:networkUsed})
                .addOperation(
                    contract.call("get_all_campaign", ids)
                )
                .setTimeout(timeout) //using a time out of a hour
                .build();
            //Simulate the transaction to discover the storage footprint, and update the
            transaction = await server.prepareTransaction(transaction);
            let transactionMeta = (await server.simulateTransaction(transaction))
            return await StellarSdk.scValToNative(transactionMeta.result.retval);
        }
        catch(e) {
            console.log(e)
            return []}
    }
    else {return []}
}