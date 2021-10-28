import Web3 from "web3"

/**
 * Detect if metamask is installed
 * @param {Web3} web3 an instance of web3
 * @returns a boolean
 */
function isMetamaskInstalled(web3){
    return web3 !== undefined && web3.currentProvider.isMetaMask
}

/**
 * Defines the styles to be used by the buttons
 * @param {boolean} isDarkTheme
 * @returns a string
 */
function getButtonsCSS(isDarkTheme) {
    let themes = isDarkTheme ? 'metamask-dark' : 'metamask-light'
    let css = `metamask-button to-center no-select ${themes}`

    return css
}

export default {
    isMetamaskInstalled,
    getButtonsCSS
}