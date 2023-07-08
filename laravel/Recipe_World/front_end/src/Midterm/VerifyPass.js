import React, { useEffect } from 'react';
import { useState } from 'react';
import './verify_pass.css';

const VerifyPass = () => {
    const [otpValue, setOtpValue] = useState('');

    useEffect(() => {
        const otpInputs = document.querySelectorAll(".otp__digit");
        const mykey = "0123456789".split("");

        otpInputs.forEach((input, index) => {
            input.addEventListener("keyup", handleNextInput);
            input.dataset.index = index + 1;
        });

        function handleNextInput(event) {
            const current = event.target;
            const index = parseInt(current.dataset.index, 10);
            current.value = event.key;

            if (event.keyCode === 8 && index > 1) {
                current.previousElementSibling.focus();
            }

            if (index < 6 && mykey.indexOf(event.key) !== -1) {
                const next = current.nextElementSibling;
                next.focus();
            }

            const finalKey = Array.from(otpInputs).map(({ value }) => value).join("");

            if (finalKey.length === 6) {
                const otpElement = document.querySelector("#_otp");
                otpElement.classList.replace("_notok", "_ok");
                otpElement.innerText = finalKey;
                setOtpValue(finalKey);
                sendOtpToLaravel(finalKey);

            } else {
                const otpElement = document.querySelector("#_otp");
                otpElement.classList.replace("_ok", "_notok");
                otpElement.innerText = finalKey;
            }
        }
    }, []);


    const sendOtpToLaravel = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/verify-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ otp: otpValue }),
            });

            if (response.ok) {
                console.log('OTP sent to Laravel successfully');
            } else {
                console.log('Error sending OTP to Laravel');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <>
            <form action="javascript: void(0)" className="otp-form" name="otp-form">
                <div className="title">
                    <h3>OTP VERIFICATION</h3>
                    <p className="info">An otp has been sent to your email</p>
                    <p className="msg">Please enter OTP to verify</p>
                </div>
                <div className="otp-input-fields">
                    <input type="number" className="otp__digit otp__field__1" />
                    <input type="number" className="otp__digit otp__field__2" />
                    <input type="number" className="otp__digit otp__field__3" />
                    <input type="number" className="otp__digit otp__field__4" />
                    <input type="number" className="otp__digit otp__field__5" />
                    <input type="number" className="otp__digit otp__field__6" />
                </div>
                <div className="result">
                    <p id="_otp" className="_notok">Your OTP</p>
                </div>
            </form>
        </>
    );
};

export default VerifyPass;
