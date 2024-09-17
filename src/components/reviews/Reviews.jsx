import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";

const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient();
  
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ gigId, desc, star });
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold">Reviews</h2>
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong!"
      ) : (
        data.map((review) => <Review key={review._id} review={review} />)
      )}
      <div className="mt-8 flex flex-col gap-5">
        <h3 className="text-xl font-semibold">Add a review</h3>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Write your opinion"
            className="p-4 border border-gray-300 rounded-md"
          />
          <select
            name=""
            className="p-4 border border-gray-300 rounded-md"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button
            type="submit"
            className="self-end w-24 py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600"
          >
            Send
          </button>
        </form>
      </div>
      <hr className="my-12 border border-gray-300" />
    </div>
  );
};

export default Reviews;
