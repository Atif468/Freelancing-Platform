import { Link, useNavigate } from 'react-router-dom';
import React from 'react';

const BecomeSeller2 = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col lg:flex-row lg:justify-start p-4 lg:p-10 items-center">
            <div className="flex flex-col lg:flex-row lg:w-full lg:gap-24">
                <div className="flex-shrink-0 mb-10 lg:mb-0">
                    <img src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/6efbf3f896f8ad45ed66505a6df63a60-1636629911828/seller_onboarding_overview_do.png" alt="" className="w-[343px] h-[502px] rounded-md" />
                </div>
                <div className="flex flex-col flex-grow bg-[#fffefe] p-4 lg:p-8">
                    <div className="mb-4">
                        <h1 className="text-xl lg:text-2xl font-medium mb-2">What makes a successful Fiverr profile?</h1>
                        <p className="text-lg text-gray-600">Your first impression matters! Create a profile that will stand out from the crowd on Fiverr.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4 bg-white p-2 rounded-md">
                                <img src="/images/becomeseller2_1.svg" alt="" className="w-10 h-12" />
                                <p className="text-lg font-medium">Take your time in creating your profile so it’s exactly as you want it to be.</p>
                            </div>
                            <div className="flex items-center gap-4 bg-white p-2 rounded-md">
                                <img src="/images/becomeseller2_2.svg" alt="" className="w-10 h-12" />
                                <p className="text-lg font-medium">Add credibility by linking out to your relevant professional networks.</p>
                            </div>
                            <div className="flex items-center gap-4 bg-white p-2 rounded-md">
                                <img src="/images/becomeseller2_3.svg" alt="" className="w-10 h-12" />
                                <p className="text-lg font-medium">Accurately describe your professional skills to help you get more work.</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 mt-4">
                            <div className="flex items-center gap-4 bg-white p-2 rounded-md">
                                <img src="/images/becomeseller2_4.svg" alt="" className="w-10 h-12" />
                                <p className="text-lg font-medium">Put a face to your name! Upload a profile picture that clearly shows your face.</p>
                            </div>
                            <div className="flex items-center gap-4 bg-white p-2 rounded-md">
                                <img src="/images/becomeseller2_5.svg" alt="" className="w-10 h-12" />
                                <p className="text-lg font-medium">To keep our community secure for everyone, we may ask you to verify your ID.</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex flex-col lg:flex-row lg:items-center">
                        <button onClick={() => navigate('/register')} className="w-auto h-12 bg-[#1dbf73] text-white font-medium text-lg rounded-sm cursor-pointer mb-4 lg:mb-0 lg:mr-4">Create A new Account As Seller</button>
                        <Link to='/becomeSeller' className="text-blue-500">Back</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BecomeSeller2;
