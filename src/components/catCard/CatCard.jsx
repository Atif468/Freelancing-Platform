import React from "react";
import { Link } from "react-router-dom";

const CatCard = ({ item }) => {
    return (
        <Link to={`/gigs?cat=${item.title}`} className="relative block w-[252px] h-[344px] rounded-md overflow-hidden cursor-pointer">
            <div className="relative w-full h-full">
                <img src={item.img} alt="" className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 text-white font-light">
                    <span className="block">{item.desc}</span>
                </div>
                <div className="absolute top-10 left-4 text-white font-semibold text-2xl">
                    <span>{item.title}</span>
                </div>
            </div>
        </Link>
    );
};

export default CatCard;
