import Error from "./error.json"
import MetamaskAuthError from "./MetamaskAuthError"

/**
 * Return all the metamask errors
 * @returns A list of MetamaskError
 */
function GetErrors(){
    return Error
}

/**
 * Given an error will throw hints for the developers to know what is happening
 * and also throw the error
 * @param {MetamaskAuthError} error the error to be logged
 */
function LogError(error){
    let errorMessage = `\nError type: ${error.type} \nError code: ${error.code} \nError description: ${error.description}`
    let exception = new MetamaskAuthError(errorMessage, error)

    exception.logHint()

    throw exception
}

export default {
    LogError, GetErrors
}