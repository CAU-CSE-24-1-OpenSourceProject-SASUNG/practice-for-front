import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode' //라이브러리 import
import React from 'react'
import axios from 'axios'
import logo from '../../static/icon/logo.svg'; // 로고 파일 경로 수정
import './GoogleLoginPage.css';

export const GoogleLoginPage = ( { setIsLogin, setUserInfo, setJWT } ) => {

    const loginHandle = (response) => {
        const decode_token = jwtDecode(response.credential); //token decode
        const data = {
            email: decode_token.email,
            username: decode_token.name,
            exp: decode_token.exp
        }

        axios.post("https://newturtles.newpotatoes.org/api/user/login", data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(response => {
                // 성공적인 요청시 response 값을 localStorage에 저장한다.
                setJWT(response.data.access_token)
                setUserInfo({name: data.username, email: data.email, picture: decode_token.picture, exp: 4})
                setIsLogin(true)
            })
            .catch(error => {
                // 실패시 에러 메시지 출력
                console.log(error)
            })
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