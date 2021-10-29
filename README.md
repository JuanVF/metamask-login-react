# MetaMask Login React

> The React Component for Login and Sign Up with MetaMask.

This is an unnoficial implementation using web3 library

## Getting Started

You can start using this project by installing it with npm with
the following command:

```
npm i metamask-login-react
```

Of course, you need to have a React project already set up. 

## How it works

This project is based on this medium post  [by Amaury Martiny](https://www.toptal.com/ethereum/one-click-login-flows-a-metamask-tutorial).

But, this works in this way. The Sign Up button will give you the public address of the user (hopefully more info in the future) so you can store it on your database or handle it in some way, is required that you have a field for a nonce (you can check more about this in the medium post). 
The Login button will ask you the nonce of the user and it will open MetaMask and ask the user if to sign it, once it is signed it will return the signed nonce to you.

## How to use

### Sign Up Button

The Sign Up button requires you to pass as props the following:

Props | Data Type | required | Description
--- | --- | --- | --- 
language | string | Optional | The language code for the button message
setPublicAddress | function(string) | Required | A function to set the address on sign up
isDarkTheme | boolean | Optional | If true enables dark mode

About how you should use this button is pretty simple, create function that receives a string (publicAddress) and inside this function you should handle the public address. Here is an example:

```js
import {SignUpButton} from "metamask-login-react"
import { useState } from 'react';

function App() {
  let [publicAddress, setPublicAddress] = useState("")

  return (
    <div className="App">
        <p>Public Address: {publicAddress}</p>
        <SignUpButton setPublicAddress={setPublicAddress} language="eng" isDarkTheme={true}/>
    </div>
  );
}
export default App;
```
If you need a customized style for the sign up button, you can do it by:
```html
<SignUpButton setPublicAddress={setPublicAddress} language="eng" isDarkTheme={true}>
    <p>Click Me</p>
</SignUpButton>
```
This will remove the standard style and replace it by what you put in the children of the Sign Up Button.
0
As a reminder, if MetaMask is not installed in the browser, the button will throw an error. So, remember to handle it properly. Also if a required props is not set it will throw an error too.

### Login Button

The Login button requires you to pass as props the following:

Props | Data Type | required | Description
--- | --- | --- | --- 
language | string | Optional | The language code for the button message
getNonce | function() : string | Required | A function that returns the nonce to be signed
setSigned | function(string) | Required | A function to handle the signed nonce
isDarkTheme | boolean | Optional | If true enables dark mode

The flow of this button is pretty simple, first it will trigger MetaMask to open, the getNonce function will pass the nonce to Metamask, after that it will ask the user if he wants to sign the nonce, finally if the user sign the nonce, this nonce will be pass as parameter to the setSigned function so you can handle it. Here is an example:

```js
import {LoginButton} from "metamask-login-react"
import { useState } from 'react';

function App() {
  let [signed, setSigned] = useState("")

  // This function could be a request to the server or something else
  let getNonce = ()=> "7561575343"

  return (
    <div className="App">
        <p>Nonce: {getNonce()}</p>
        <p>Signed Nonce: {signed}</p>
        <LoginButton setSigned={setSigned} getNonce={getNonce} language="eng" isDarkTheme={true}/>
    </div>
  );
}

export default App;
```
Of course as the sign up button, if you want a customized example you can do it like this:

```html
<LoginButton setSigned={setSigned} getNonce={getNonce} language="eng" isDarkTheme={true}>
    <p>Click Me</p>
</LoginButton>;
```

## Error Table

Here is the list of errors that the button can throw and log.

Error | Type | Description | Hint to fix it
--- | --- | --- | --- 
notInstalled | service | Metamask service is not started or installed | If you have already installed Metamask start the service. If not install it.
noAccounts | service | It seems that you don't have any metamask account to be used | Check if you already logged your account at metamask or create one.
errorNotFound | dev | You're throwing an error that doesn't exists | Check if you misspelled the error name or if that error code exists
notSetSigned | dev | It seems that the props setSigned was not received | Pass a function setSigned(signed) to receive the signed nonce, pass this via props
notGetNonce | dev | It seems that the props getNonce was not received |Pass a function getNonce that returns the nonce as a string via props
invalidLang | dev | The language you passed as props is not supported yet or is invalid | Check if you misspelled the language code or check if it is supported at the docs
notSetPublicAddress | dev | It seems that the props notSetPublicAddress was not received | Pass a function notSetPublicAddress(signed) to receive the public address, pass this via props

## Supported Languages

If you're using the default styles of the buttons, here are the supported languages and the code to use it. If you want to contribute, you can add the transalations to this file `src/assets/json/languages.json`

Language | Code 
--- | --- |
English | eng
Spanish | esp 