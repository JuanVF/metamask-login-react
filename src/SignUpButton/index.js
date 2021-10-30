import MetamaskService from "../MetamaskService/"
import ErrorService from "../ErrorService"
import Utils from "../Utils"

import React from 'react'

import MetamaskIcon from "../assets/images/metamask.svg"
import languages from "../assets/json/languages.json"

import "../index.css"

const metamaskService = new MetamaskService()

/**
 * Metamask sign-up button
 * @params {language, setPublicAddress, isDarkTheme} props 
 * @returns 
 */
function SignUpButton(props){
    logInitialErrors(props)

    let lang = props.language || "eng"
    let isDarkTheme = props.isDarkTheme || false

    const onClick = async () => {
        let accounts = await metamaskService.getAccounts()
    
        props.setPublicAddress(accounts[0])
    }

    let button = props.children ? props.children : getJSX(lang, isDarkTheme)

    return (
        <div onClick={onClick}>
            {button}
        </div>
    )
}

/**
 * Returns the JSX for the Sign Up Button
 * @param {string} lang The language code
 * @param {boolean} isDarkTheme If true use the dark theme
 * @returns JSX
 */
function getJSX(lang, isDarkTheme){   
    return (
        <div className={Utils.getButtonsCSS(isDarkTheme)}>
            <img src={MetamaskIcon} alt={languages[lang]["sign-up-button"]}/>
            <p>{languages[lang]["sign-up-button"]}</p>
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

    if (!props.setPublicAddress)
        err = errorCollection.dev.notGetNonce

    if (props.language && !languages[props.language])
        err = errorCollection.dev.invalidLang

    if (err)
        ErrorService.LogError(err)
}

export default SignUpButton