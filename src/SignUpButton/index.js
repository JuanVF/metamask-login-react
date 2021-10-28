import MetamaskService from "../MetamaskService/"
import Utils from "../Utils"

import MetamaskIcon from "../assets/images/metamask.svg"
import languages from "../assets/json/languages.json"

const metamaskService = new MetamaskService()

/**
 * Metamask sign-up button
 * @params {language, setPublicAddress, isDarkTheme} props 
 * @returns 
 */
function SignUpButton(props){
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

export default SignUpButton