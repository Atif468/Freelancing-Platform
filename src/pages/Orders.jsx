import React from "react";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        return res.data;
      }),
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;
    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (error) {
      if (error.response.status === 404) {
        const res = await newRequest.post(`/conversations`, {
          to: currentUser.isSeller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  return (
    <div className="flex justify-center p-4">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="w-full max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold">Orders</h1>
          </div>
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4">Image</th>
                <th className="text-left py-4">Title</th>
                <th className="text-left py-4">Price</th>
                <th className="text-left py-4">Contact</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order) => (
                <tr key={order._id} className="border-b even:bg-green-100">
                  <td className="px-4 py-2">
                    <img className="w-12 h-6 object-cover" src={order.img} alt="" />
                  </td>
                  <td className="px-4 py-2">{order.title}</td>
                  <td className="px-4 py-2">${order.price}</td>
                  <td className="px-4 py-2">
                    <img
                      className="w-6 cursor-pointer"
                      src="/images/message.png"
                      alt="Contact"
                      onClick={() => handleContact(order)}
                    />
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

export default Orders;
