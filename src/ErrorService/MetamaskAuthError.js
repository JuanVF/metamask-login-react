class MetamaskAuthError extends Error {
  constructor(message, error) {
    super(`${message}\nCheck hint at the console`)
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, error)
    }

    this.name = 'Metamask Auth Error'

    this.errorData = error
  }

  /**
   * This function will log a hint for the error
   */
  logHint(){
    console.warn(`MetamaskAuthError hint: ${this.errorData.hint}`)
  }
}

export default MetamaskAuthError