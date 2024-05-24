import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // 라이브러리 import
import logo from '../../static/icon/logo.svg'; // 로고 파일 경로 수정
import './GoogleLoginPage.css';

export const GoogleLoginPage = ({ setIsLogin, setUserInfo, setJWT }) => {
    const navigate = useNavigate();

    const loginHandle = async (response) => {
        const decode_token = jwtDecode(response.credential); // token decode
        const data = {
            email: decode_token.email,
            name: decode_token.name
        };

        try {
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
            setJWT(fetchedDataJson.access_token);
            //TODO : 유저 정보 받아서 여기서 초기화 하기
            setUserInfo({ name: data.name, email: data.email, picture: decode_token.picture, exp: 4, gameTicket: 40, riddleTicket: 3 });
            setIsLogin(true);
            navigate('/main'); // 로그인 성공 시 /main으로 네비게이트
        } catch (error) {
            console.error('Login failed:', error);
        }
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
