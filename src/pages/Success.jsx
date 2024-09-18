import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import newRequest from '../utils/newRequest';
import React from 'react';

const Success = () => {
    const { search } = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(search);
    const payment_intent = params.get('payment_intent');
    
    useEffect(() => {
        const makeRequest = async () => {
            try {
                await newRequest.put('/orders', { payment_intent });
                setTimeout(() => {
                    navigate("orders");
                }, 5000);
            } catch (error) {
                console.log(error);
            }
        }
        makeRequest();
    }, [navigate, payment_intent]);

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <div className="flex justify-center mb-6">
                <img src="images/successfully-done.gif" alt="Success" className="w-40 h-40 md:w-72 md:h-72" />
            </div>
            <div className="text-green-500 text-base md:text-lg flex justify-center mb-6">
                Payment successful. You are being redirected to the order page.
            </div>
            <span className="text-red-500 text-sm md:text-base text-center">
                Please do not close the page.
            </span>
        </div>
    );
}
export default Success;
