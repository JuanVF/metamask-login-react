import MetamaskService from "../MetamaskService/"
import ErrorService from "../ErrorService"
import Utils from "../Utils"

import React from 'react'

import MetamaskIcon from "../assets/images/metamask.svg"
import languages from "../assets/json/languages.json"

import "../index.css"

const metamaskService = new MetamaskService()

/**
 * Metamask login button
 * @param {object} props This will have { language, getNonce, setSigned, isDarkTheme }
 * @returns a React.js component
 */
function LoginButton(props){
    logInitialErrors(props)

    let lang = props.language || "eng"
    let isDarkTheme = props.isDarkTheme || false

    // Function to handle on click event from login button
    const onClick = async () => {
        let publicAddress = await metamaskService.getAccounts()
        let result = await metamaskService.sign(publicAddress[0], props.getNonce())

        props.setSigned(result)
    }

    let button = props.children ? props.children : getJSX(lang, isDarkTheme)

    return (
        <div onClick={onClick}>
            {button}
        </div>
    )
}

/**
 * Returns the JSX for the Login Button
 * @param {string} lang The language code
 * @param {boolean} isDarkTheme If true use the dark theme
 * @returns JSX
 */
function getJSX(lang, isDarkTheme){
    return (
        <div className={Utils.getButtonsCSS(isDarkTheme)} >
            <img src={MetamaskIcon} alt={languages[lang]["login-button"]}/>
            <p>{languages[lang]["login-button"]}</p>
        </div>
    )
}

/**
 * This function will check if there are initial errors, if exists it will throw it and log it
 * @param {object} props This will have { language, getNonce, setSigned, isDarkTheme }
 */
const logInitialErrors = props => {
    let err = undefined
    let errorCollection = ErrorService.GetErrors()

    if (!Utils.isMetamaskInstalled(metamaskService.web3))
        err = errorCollection.service.notInstalled

    if (!props.getNonce)
        err = errorCollection.dev.notGetNonce

    if (!props.setSigned)
        err = errorCollection.dev.notSetSigned

    if (props.language && !languages[props.language])
        err = errorCollection.dev.invalidLang

    if (err)
        ErrorService.LogError(err)
}

export default LoginButton