import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import React from 'react'

export const GoogleLoginPage = ( { setIsLogin, setUser } ) => {
    const loginHandle = (response) => {
        console.log(response)
        const decode_token = jwtDecode(response.credential) //token decode
        setUser(decode_token)
        setIsLogin(true);
        console.log(decode_token)
    }
    return (
        <div className="google-login">
            <GoogleLogin
                onSuccess={loginHandle}
                onError={() => {
                    console.log("Login Failed");
                }}
                text="continue_with"
                width={"500px"}
                useOneTap='true'
            />

        </div>
    )
}
export default GoogleLoginPage