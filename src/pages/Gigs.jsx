import React, { useState, useRef, useEffect } from "react";
import GigCard from '../components/GigCard/GigCard';
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import { useLocation } from "react-router-dom";

const Gigs = () => {
    const [open, setOpen] = useState(false);
    const [sort, setSort] = useState("sales");
    const minRef = useRef();
    const maxRef = useRef();
    const { search } = useLocation();
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ['gigs'],
        queryFn: () =>
            newRequest.get(`/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`)
            .then((res) => res.data)
    });

    useEffect(() => {
        refetch();
    }, [refetch, sort]);

    const resort = (type) => {
        setSort(type);
        setOpen(false);
    };

    const apply = () => {
        refetch();
    };

    return (
        <div className="flex justify-center py-8 px-4 md:px-8 lg:px-16">
            <div className="container w-full max-w-screen-xl mx-auto flex flex-col gap-4">
                <span className="text-gray-500 text-sm font-light">FIVERR &gt; GRAPHICS & DESIGN &gt;</span>
                <h1 className="text-3xl font-bold">design</h1>
                <p className="text-gray-600 text-base font-light">Explore the boundaries of art and technology with GigVerse's AI artists</p>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 text-gray-600 font-semibold">
                        <span>Budget</span>
                        <input ref={minRef} type="number" placeholder="min" className="p-2 border border-gray-300 rounded-md" />
                        <input ref={maxRef} type="number" placeholder="max" className="p-2 border border-gray-300 rounded-md" />
                        <button onClick={apply} className="bg-green-500 text-white py-2 px-4 rounded-md">Apply</button>
                    </div>
                    <div className="relative flex items-center gap-2 text-gray-600">
                        <span className="font-light">Sort By</span>
                        <span className="font-semibold">{sort === "sales" ? "Best Selling" : "Newest"}</span>
                        <img src="/images/down.png" alt="" className="w-4 cursor-pointer" onClick={() => setOpen(!open)} />
                        {open && (
                            <div className="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg flex flex-col gap-2 p-2 text-gray-600">
                                {sort === "sales" ? (
                                    <span onClick={() => resort('createdAt')} className="cursor-pointer">Newest</span>
                                ) : (
                                    <span onClick={() => resort('sales')} className="cursor-pointer">Best Selling</span>
                                )}
                                <span onClick={() => resort("sales")} className="cursor-pointer">Popular</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-wrap gap-4 justify-center">
                    {isLoading ? (
                        <div className="loader mx-auto border-4 border-t-4 border-green-500 border-solid rounded-full w-10 h-10 animate-spin"></div>
                    ) : error ? (
                        <h4 className="text-red-500">Something went wrong</h4>
                    ) : data.length === 0 ? (
                        <h4 className="text-orange-500">No results found</h4>
                    ) : (
                        data.map((gig) => <GigCard key={gig._id} item={gig} />)
                    )}
                </div>
            </div>
        </div>
    );
};

export default Gigs;
