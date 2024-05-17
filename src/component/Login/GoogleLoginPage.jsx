import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode' //라이브러리 import
import React from 'react'
import logo from '../../static/icon/logo.svg'; // 로고 파일 경로 수정
import './GoogleLoginPage.css';

export const GoogleLoginPage = ( { setIsLogin, setUserInfo, setJWT } ) => {

    const loginHandle = async (response) => {
        const decode_token = jwtDecode(response.credential); //token decode
        console.log(decode_token.email);
        console.log(decode_token.name);
        const data = {
            'email': decode_token.email,
            'name': decode_token.name
        }

        const fetchedData = await fetch('http://localhost:8000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!fetchedData.ok) {
            throw new Error('Network response was not ok.');
        }
        const fetchedDataJson = await fetchedData.json();
        setJWT(fetchedDataJson.access_token)
        setUserInfo({name: data.name, email: data.email, picture: decode_token.picture, exp: 4})
        setIsLogin(true)
    }

    return (
        <div className="container">
            <div className="group">
                <div className="logo-bg">
                    <img src={logo} alt="Logo" className="logo" />
                </div>
                <GoogleLogin
                    onSuccess={loginHandle}
                    onError={() => {
                        console.log("Login Failed");
                    }}
                    text="continue_with"
                    useOneTap={true}
                    width="200px"
                    size="large"
                    shape="pill"
                    ux_mode="popup"
                />
            </div>
        </div>
    );
};

export default GoogleLoginPage