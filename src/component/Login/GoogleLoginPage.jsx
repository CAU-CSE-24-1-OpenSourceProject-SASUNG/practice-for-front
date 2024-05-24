import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // 라이브러리 import
import logo from '../../static/icon/logo.svg'; // 로고 파일 경로 수정
import './GoogleLoginPage.css';
import axios from "axios";

export const GoogleLoginPage = ({ setIsLogin, setUserInfo, JWT, setJWT }) => {
    const navigate = useNavigate();

    const loginHandle = async (response) => {
        const decode_token = jwtDecode(response.credential); // token decode
        const data = {
            email: decode_token.email,
            name: decode_token.name
        };

        axios.post(`${process.env.REACT_APP_API_URL}/user/login`, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response.data.access_token);
            setJWT(response.data.access_token);

            axios.get(`${process.env.REACT_APP_API_URL}/user/info`,{
                headers : {
                    'Authorization': `Bearer ${response.data.access_token}`
                }
            }).then((response) => {
                setUserInfo({ name: data.name, email: data.email, picture: decode_token.picture, exp: 4, gameTicket: response.data.gameTicket, riddleTicket: response.data.riddleTicket });
                setIsLogin(true);
                navigate('/main'); // 로그인 성공 시 /main으로 네비게이트
            }).catch((error) => {
                console.error('Login failed:', error);
            })
        }).catch((error) => {
            console.error('Login failed:', error);
        });
    };

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

export default GoogleLoginPage;
