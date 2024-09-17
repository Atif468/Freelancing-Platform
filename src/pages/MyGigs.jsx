import React from "react";
import { Link } from "react-router-dom";
import getCurrentUser from "../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";

function MyGigs() {
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${currentUser._id}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (id) => newRequest.delete(`/gigs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id) => {
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
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold">Gigs</h1>
            {currentUser.isSeller && (
              <Link to="/add">
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600">
                  Add New Gig
                </button>
              </Link>
            )}
          </div>
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4">Image</th>
                <th className="text-left py-4">Title</th>
                <th className="text-left py-4">Price</th>
                <th className="text-left py-4">Sales</th>
                <th className="text-left py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((gig) => (
                <tr key={gig._id} className="border-b even:bg-green-100">
                  <td className="px-4 py-2">
                    <img className="w-12 h-6 object-cover" src={gig.cover} alt="" />
                  </td>
                  <td className="px-4 py-2">{gig.title}</td>
                  <td className="px-4 py-2">${gig.price}</td>
                  <td className="px-4 py-2">{gig.sales}</td>
                  <td className="px-4 py-2">
                    <img
                      className="w-6 cursor-pointer"
                      src="/images/delete.png"
                      alt="Delete"
                      onClick={() => handleDelete(gig._id)}
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
}

export default MyGigs;
