import React from "react";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import { Link, useParams } from "react-router-dom";
import Reviews from "../components/reviews/Reviews";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Gig = () => {
    const { id } = useParams();

    const { isLoading, error, data } = useQuery({
        queryKey: ['gig'],
        queryFn: () =>
            newRequest.get(`/gigs/single/${id}`)
                .then((res) => res.data)
    });

    const userId = data?.userId;

    const { isLoading: isLoadingUser, error: errorUser, data: dataUser } = useQuery({
        queryKey: ['user'],
        queryFn: () =>
            newRequest.get(`/users/${userId}`)
                .then((res) => res.data),
        enabled: !!userId,
    });

    // Slider settings
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <div className="flex justify-center p-6 md:p-8 lg:p-12">
            <div className="w-full max-w-screen-xl flex gap-6 lg:gap-12">
                <div className="flex-2 flex flex-col gap-6">
                    <span className="text-gray-500 text-sm font-light">FIVERR &gt; GRAPHICS & DESIGN &gt;</span>
                    <h1 className="text-2xl md:text-3xl font-bold">{data?.title}</h1>
                    {isLoadingUser ? "Loading..." : errorUser ? "Something went wrong" :
                        <div className="flex items-center gap-3">
                            <img src={dataUser?.img || "/images/noavtar.jpeg"} alt="" className="w-8 h-8 rounded-full" />
                            <span className="text-sm font-medium">{dataUser?.username}</span>
                            {!isNaN(data?.totalStars / data?.starNumber) &&
                                <div className="flex items-center gap-1">
                                    {Array(Math.round(data?.totalStars / data?.starNumber)).fill().map((_, i) =>
                                        <img src="/images/star.png" alt="" className="w-4 h-4" key={i} />
                                    )}
                                    <span className="font-bold text-yellow-500">{Math.round(data?.totalStars / data?.starNumber)}</span>
                                </div>
                            }
                        </div>
                    }

                    {/* Slider */}
                    <Slider {...sliderSettings} className="w-full max-h-[500px]">
                        {data?.images.map((img, index) => (
                            <img key={index} src={img} alt="" className="object-contain w-full h-full" />
                        ))}
                    </Slider>

                    <h2 className="text-xl font-medium">About This Gig</h2>
                    <p className="text-gray-600 text-base leading-7">{data?.desc}</p>

                    {isLoadingUser ? "Loading..." : errorUser ? "Something went wrong" :
                        <div className="flex flex-col gap-6 mt-12">
                            <h2 className="text-xl font-medium">About The Seller</h2>
                            <div className="flex items-center gap-6">
                                <img src={dataUser?.img || "/images/noavtar.jpeg"} alt="" className="w-24 h-24 object-cover rounded-full" />
                                <div className="flex flex-col gap-2">
                                    <span className="text-lg font-medium">{dataUser?.username}</span>
                                    {!isNaN(data?.totalStars / data?.starNumber) &&
                                        <div className="flex items-center gap-1">
                                            {Array(Math.round(data?.totalStars / data?.starNumber)).fill().map((_, i) =>
                                                <img src="/images/star.png" alt="" className="w-4 h-4" key={i} />
                                            )}
                                            <span className="font-bold text-yellow-500">{Math.round(data?.totalStars / data?.starNumber)}</span>
                                        </div>
                                    }
                                    <button className="bg-white border border-gray-300 rounded px-4 py-2">Contact Me</button>
                                </div>
                            </div>

                            <div className="border border-gray-300 rounded-lg p-4 mt-6">
                                <div className="flex flex-wrap gap-4 mb-4">
                                    <div className="w-1/2 sm:w-1/3 lg:w-1/4">
                                        <span className="block text-gray-500">From</span>
                                        <span className="block font-medium">{dataUser?.country}</span>
                                    </div>
                                    <div className="w-1/2 sm:w-1/3 lg:w-1/4">
                                        <span className="block text-gray-500">Member since</span>
                                        <span className="block font-medium">Aug 2022</span>
                                    </div>
                                    <div className="w-1/2 sm:w-1/3 lg:w-1/4">
                                        <span className="block text-gray-500">Avg. response time</span>
                                        <span className="block font-medium">4 hours</span>
                                    </div>
                                    <div className="w-1/2 sm:w-1/3 lg:w-1/4">
                                        <span className="block text-gray-500">Last delivery</span>
                                        <span className="block font-medium">1 day</span>
                                    </div>
                                    <div className="w-1/2 sm:w-1/3 lg:w-1/4">
                                        <span className="block text-gray-500">Languages</span>
                                        <span className="block font-medium">English</span>
                                    </div>
                                </div>
                                <hr className="border-gray-300 mb-4" />
                                <p className="text-gray-600">{dataUser?.desc}</p>
                            </div>
                        </div>
                    }
                    <Reviews gigId={id} key={id} />
                </div>

                <div className="flex-1 bg-white border border-gray-300 rounded-lg p-6 sticky top-24 max-h-[500px]">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">{data?.sortTitle}</h3>
                        <h2 className="text-xl font-bold">${data?.price}</h2>
                    </div>
                    <p className="text-gray-600 mb-4">{data?.sortDesc}</p>
                    <div className="flex flex-col gap-4 mb-4">
                        <div className="flex items-center gap-2">
                            <img src="/images/clock.png" alt="" className="w-5 h-5" />
                            <span>{data?.deliveryTime} days Delivery</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <img src="/images/recycle.png" alt="" className="w-5 h-5" />
                            <span>{data?.rivisonNumber} Revisions</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        {data?.features.map((feature, index) => (
                            <div className="flex items-center gap-2" key={index}>
                                <img src="/images/greencheck.png" alt="" className="w-4 h-4" />
                                <span className="text-gray-600">{feature}</span>
                            </div>
                        ))}
                    </div>
                    <Link to={`/pay/${id}`}>
                        <button className="bg-green-500 text-white py-2 rounded w-full text-lg">Continue</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Gig;
