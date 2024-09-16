import { Link, useNavigate } from 'react-router-dom';
import React from 'react';

const BecomeSeller = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col lg:flex-row lg:justify-start p-4 lg:p-10 items-center">
            <div className="flex flex-col lg:flex-row lg:w-full lg:gap-24">
                <div className="flex flex-col flex-grow gap-4">
                    <h1 className="font-medium mb-2 text-xl lg:text-2xl">Ready to start selling on Fiverr? Here’s the breakdown:</h1>
                    <hr className="my-4" />
                    <div className="flex items-center gap-4 font-medium text-lg">
                        <img src="/images/becomeseller1.svg" alt="check" className="w-8 h-8" />
                        Learn what makes a successful profile
                    </div>
                    <p className="text-lg font-light text-gray-600 leading-7 tracking-wide"> the do’s and don’ts to ensure you’re always on the right track.</p>
                    <hr className="my-4" />
                    <div className="flex items-center gap-4 font-medium text-lg">
                        <img src="/images/becomeseller2.svg" alt="check" className="w-8 h-8" />
                        Create your seller profile
                    </div>
                    <p className="text-lg font-light text-gray-600 leading-7 tracking-wide">Add your profile picture, description, and professional information.</p>
                    <hr className="my-4" />
                    <div className="flex items-center gap-4 font-medium text-lg">
                        <img src="/images/becomeseller3.svg" alt="check" className="w-8 h-8" />
                        Publish your Gig
                    </div>
                    <p className="text-lg font-light text-gray-600 leading-7 tracking-wide">Create a Gig of the service you’re offering and start selling instantly.</p>
                    <hr className="my-4" />
                </div>
                <div className="flex items-center justify-center bg-black">
                    <video src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/v1/video-attachments/generic_asset/asset/966b0ae895e85b526600eff1d21e3cf4-1674728725728/Seller%20onboarding%20video%20HQ" controls className="w-full max-w-[720px]" />
                </div>
            </div>
            <div className="mt-4 flex items-center">
                <button onClick={() => navigate('/becomeSeller2')} className="w-auto h-12 bg-[#1dbf73] text-white font-medium text-lg rounded-sm cursor-pointer">Become Seller</button>
                <Link to='/' className='ml-2 text-blue-500'>Back</Link>
            </div>
        </div>
    );
};

export default BecomeSeller;
