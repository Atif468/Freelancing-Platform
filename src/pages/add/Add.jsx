import React, { useReducer, useState } from "react";
import { INITIAL_STATE, gigReducer } from "../../reducers/gigReducers";
import upload from '../../utils/upload.js';
import { useQueryClient, useMutation } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Add = () => {
    const [singleFile, setsingleFile] = useState(undefined);
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

    const handlechange = (e) => {
        dispatch({
            type: "CHANGE_INPUT", payload: {
                name: e.target.name, value: e.target.value
            }
        });
    };

    const handlefeature = (e) => {
        e.preventDefault();
        dispatch({
            type: "ADD_FEATURE", payload: e.target[0].value,
        });
        e.target.value = '';
    };

    const handleupload = async () => {
        setUploading(true);
        try {
            const cover = await upload(singleFile);

            const images = await Promise.all(
                [...files].map(async file => {
                    const url = await upload(file);
                    return url;
                })
            );
            setUploading(false);
            dispatch({
                type: "ADD_IMAGES", payload: {
                    cover, images
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (gig) => {
            return newRequest.post("/gigs", gig);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["myGigs"]);
        }
    });

    const handlesubmit = (e) => {
        e.preventDefault();
        mutation.mutate(state);
        navigate('/mygigs');
    };

    return (
        <div className="flex justify-center font-montserrat px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-7xl py-10">
                <h1 className="mb-8 text-gray-500 font-light text-2xl">Add New Gig</h1>
                <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-16">
                    {/* Left Section */}
                    <div className="flex-1 flex flex-col gap-6 justify-between">
                        <label className="text-gray-500 text-lg">Title</label>
                        <input 
                            type="text" 
                            name="title" 
                            placeholder="e.g. I will do something I'm really good at"
                            onChange={handlechange}
                            className="text-sm p-4 border border-gray-300 rounded-md"
                        />
                        <select name="cat" onChange={handlechange} className="text-sm p-4 border border-gray-300 rounded-md">
                            <option value="Design">Design</option>
                            <option value="Web developer">Web Developer</option>
                            <option value="Animation">Animation</option>
                            <option value="Music">Music</option>
                        </select>

                        <div className="flex flex-col gap-4">
                            <label>Cover Image</label>
                            <input type="file" onChange={e => setsingleFile(e.target.files[0])} className="border border-gray-300 rounded-md p-2" />
                            <label>Upload Images</label>
                            <input type="file" multiple onChange={e => setFiles(e.target.files)} className="border border-gray-300 rounded-md p-2" />
                        </div>

                        <button onClick={handleupload} className="text-white bg-green-500 p-4 rounded-md font-medium text-lg">
                            {uploading ? "Uploading" : "Upload"}
                        </button>

                        <label className="text-gray-500 text-lg">Description</label>
                        <textarea 
                            name="desc" 
                            placeholder="A brief description to introduce your service to customers"
                            onChange={handlechange}
                            className="text-sm p-4 border border-gray-300 rounded-md h-[200px]"
                        />

                        <button onClick={handlesubmit} className="text-white bg-green-500 p-4 rounded-md font-medium text-lg">
                            Create
                        </button>
                    </div>

                    {/* Right Section */}
                    <div className="flex-1 flex flex-col gap-6 justify-between">
                        <label className="text-gray-500 text-lg">Service Title</label>
                        <input 
                            type="text" 
                            placeholder="e.g. One-page web design"
                            name="sortTitle"
                            className="text-sm p-4 border border-gray-300 rounded-md"
                        />
                        
                        <label className="text-gray-500 text-lg">Short Description</label>
                        <textarea 
                            name="sortDesc" 
                            placeholder="Short description of your service"
                            onChange={handlechange}
                            className="text-sm p-4 border border-gray-300 rounded-md h-[100px]"
                        />

                        <label className="text-gray-500 text-lg">Delivery Time (e.g. 3 days)</label>
                        <input 
                            type="number" 
                            name="deliveryTime" 
                            min={2}
                            onChange={handlechange}
                            className="text-sm p-4 border border-gray-300 rounded-md"
                        />

                        <label className="text-gray-500 text-lg">Revision Number</label>
                        <input 
                            type="number" 
                            name="revisonNumber" 
                            min={1}
                            onChange={handlechange}
                            className="text-sm p-4 border border-gray-300 rounded-md"
                        />

                        <label className="text-gray-500 text-lg">Add Features</label>
                        <form onSubmit={handlefeature} className="flex gap-4">
                            <input 
                                type="text" 
                                placeholder="e.g. page design"
                                className="w-full text-sm p-4 border border-gray-300 rounded-md"
                            />
                            <button type="submit" className="text-white bg-green-500 p-4 rounded-md font-medium text-lg">Add</button>
                        </form>

                        <div className="flex flex-wrap gap-4">
                            {state?.features?.map(f => (
                                <div key={f} className="flex items-center gap-4">
                                    <button 
                                        onClick={() => dispatch({ type: "REMOVE_FEATURE", payload: f })}
                                        className="h-8 px-4 text-red-500 text-xs font-light border border-red-500 flex items-center gap-2">
                                        {f}
                                        <span>X</span>
                                    </button>
                                </div>
                            ))}
                        </div>

                        <label className="text-gray-500 text-lg">Price</label>
                        <input 
                            type="number" 
                            name="price" 
                            onChange={handlechange}
                            className="text-sm p-4 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Add;
