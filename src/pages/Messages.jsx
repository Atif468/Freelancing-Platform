import React from "react";
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import moment from 'moment';

const Messages = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const queryClient = useQueryClient();

    const { isLoading, error, data } = useQuery({
        queryKey: ["conversations"],
        queryFn: () =>
            newRequest.get(`/conversations`).then((res) => res.data),
    });

    const mutation = useMutation({
        mutationFn: (id) => newRequest.put(`/conversations/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["conversations"]);
        },
    });

    const handleRead = (id) => {
        mutation.mutate(id);
    };

    return (
        <div className="flex justify-center p-4">
            {isLoading ? (
                "Loading..."
            ) : error ? (
                "Something went wrong"
            ) : (
                <div className="w-full max-w-6xl">
                    <div className="flex items-center justify-between py-4">
                        <h1 className="text-xl font-bold">Messages</h1>
                    </div>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-4">{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                                <th className="text-left py-4">Last Message</th>
                                <th className="text-left py-4">Date</th>
                                <th className="text-left py-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((c) => (
                                <tr
                                    className={`border-b h-20 ${
                                        ((currentUser.isSeller && !c.readBySeller) ||
                                            (!currentUser.isSeller && !c.readByBuyer)) &&
                                        "bg-green-100"
                                    }`}
                                    key={c.id}
                                >
                                    <td className="px-4 font-medium">{currentUser.isSeller ? c.buyerId : c.sellerId}</td>
                                    <td className="px-4 text-gray-500">
                                        <Link to={`/message/${c.id}`} className="text-blue-500">
                                            {c?.lastMessage?.substring(0, 100)}...
                                        </Link>
                                    </td>
                                    <td className="px-4 text-gray-500">{moment(c.updatedAt).fromNow()}</td>
                                    <td className="px-4">
                                        {((currentUser.isSeller && !c.readBySeller) ||
                                            (!currentUser.isSeller && !c.readByBuyer)) && (
                                            <button
                                                onClick={() => handleRead(c.id)}
                                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                            >
                                                Mark as Read
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Messages;
