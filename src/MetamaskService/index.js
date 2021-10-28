import Web3 from 'web3';

import ErrorService from "../ErrorService"

/**
 * MetamaskService is a class that have the common functions to be used to interact with Metamask
 */
class MetamaskService {
    constructor(){ 
        this.address = "ws://localhost:8545"
        this.web3 = new Web3(Web3.givenProvider || this.address);
        this.errors = ErrorService.GetErrors()
    }

    /**
     * This function will return the public address of the accounts
     * @returns A list
     */
    async getAccounts(){
        let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        if (!accounts.length || accounts.length === 0){
            let error = this.errors.service.noAccounts

            ErrorService.LogError(error)
        }

        return accounts
    }
    
    /**
     * Given a message it will be signed by the public address passed as param
     * @param {string} publicAddress The public address of the user
     * @param {string} message The message to be signed
     * @returns A promise
     */
    async sign(publicAddress, message){
        return await this.web3.eth.personal.sign(message, publicAddress)
    }
}

export default MetamaskService