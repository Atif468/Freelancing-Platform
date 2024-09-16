import React, { useReducer, useState } from "react";
import { INITIAL_STATE, gigReducer } from "../reducers/gigReducers.js";
import upload from '../utils/upload.js';
import { useQueryClient, useMutation } from "@tanstack/react-query";
import newRequest from "../utils/newRequest.js";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
const Add = () => {
    const [singleFile, setsingleFile] = useState(undefined);
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

    useEffect(() => {
        Aos.init({
          duration: 2000,
        });
      }, []);
      
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
        <div className="flex justify-center font-sans p-8">
            <div className="max-w-4xl w-full">
                <h1 className="text-gray-500 text-2xl font-light mb-8">Add New Gig</h1>
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 flex flex-col gap-4">
                        <label className="text-gray-500 text-lg">Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="e.g. I will do something I'm really good at"
                            onChange={handlechange}
                            className="p-4 text-sm border border-gray-300 rounded"
                        />
                        <select
                            name="cat"
                            onChange={handlechange}
                            className="p-4 text-sm border border-gray-300 rounded"
                        >
                            <option value="Design">Design</option>
                            <option value="Web developer">Web Developer</option>
                            <option value="Animation">Animation</option>
                            <option value="Music">Music</option>
                        </select>
                        <div className="flex flex-col gap-4">
                            <label className="text-gray-500 text-lg">Cover Image</label>
                            <input
                                type="file"
                                onChange={e => setsingleFile(e.target.files[0])}
                                className="border border-gray-300 rounded"
                            />
                            <label className="text-gray-500 text-lg">Upload Images</label>
                            <input
                                type="file"
                                multiple
                                onChange={e => setFiles(e.target.files)}
                                className="border border-gray-300 rounded"
                            />
                        </div>
                        <button
                            onClick={handleupload}
                            className="bg-green-500 text-white p-4 text-lg font-medium rounded"
                        >
                            {uploading ? "Uploading" : "Upload"}
                        </button>
                        <label className="text-gray-500 text-lg">Description</label>
                        <textarea
                            name="desc"
                            cols="30"
                            rows="10"
                            placeholder="A brief description to introduce your service to customers"
                            onChange={handlechange}
                            className="p-4 text-sm border border-gray-300 rounded"
                        ></textarea>
                        <button
                            onClick={handlesubmit}
                            className="bg-green-500 text-white p-4 text-lg font-medium rounded"
                        >
                            Create
                        </button>
                    </div>
                    <div className="flex-1 flex flex-col gap-4">
                        <label className="text-gray-500 text-lg">Service Title</label>
                        <input
                            type="text"
                            placeholder="e.g. One-page web design"
                            name="sortTitle"
                            className="p-4 text-sm border border-gray-300 rounded"
                        />
                        <label className="text-gray-500 text-lg">Short Description</label>
                        <textarea
                            name="sortDesc"
                            onChange={handlechange}
                            placeholder="Short description of your service"
                            cols="30"
                            rows="10"
                            className="p-4 text-sm border border-gray-300 rounded"
                        ></textarea>
                        <label className="text-gray-500 text-lg">Delivery Time (e.g. 3 days)</label>
                        <input
                            type="number"
                            name="deliveryTime"
                            min={2}
                            onChange={handlechange}
                            className="p-4 text-sm border border-gray-300 rounded"
                        />
                        <label className="text-gray-500 text-lg">Revision Number</label>
                        <input
                            type="number"
                            min={1}
                            name="revisonNumber"
                            onChange={handlechange}
                            className="p-4 text-sm border border-gray-300 rounded"
                        />
                        <label className="text-gray-500 text-lg">Add Features</label>
                        <form onSubmit={handlefeature} className="flex gap-4">
                            <input
                                type="text"
                                placeholder="e.g. page design"
                                className="p-4 text-sm border border-gray-300 rounded flex-grow"
                            />
                            <button
                                type="submit"
                                className="bg-green-500 text-white p-2 text-sm font-medium rounded"
                            >
                                Add
                            </button>
                        </form>
                        <div className="flex gap-4">
                            {state?.features?.map(f => (
                                <div className="flex items-center gap-2" key={f}>
                                    <button
                                        onClick={() => dispatch({
                                            type: "REMOVE_FEATURE", payload: f
                                        })}
                                        className="bg-transparent text-red-500 border border-red-500 p-2 text-sm font-medium rounded"
                                    >
                                        {f}
                                        <span className="ml-2">X</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <label className="text-gray-500 text-lg">Price</label>
                        <input
                            type="number"
                            onChange={handlechange}
                            name="price"
                            className="p-4 text-sm border border-gray-300 rounded"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Add;
