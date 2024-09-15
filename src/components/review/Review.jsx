import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import newRequest from "../../utils/newRequest";

const Review = ({ review }) => {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
      newRequest.get(`/users/${review.userId}`).then((res) => res.data),
  });

  const handleLike = () => {
    setLike(true);
  };

  const handleDislike = () => {
    setDislike(true);
  };

  return (
    <div className="flex flex-col gap-5 my-5">
      {isLoading ? (
        <div className="loader"></div>
      ) : error ? (
        "Error"
      ) : (
        <div className="flex items-center gap-4">
          <img
            className="w-12 h-12 rounded-full"
            src={data.img || "/images/noavtar.jpeg"}
            alt=""
          />
          <div className="flex flex-col">
            <span className="font-semibold">{data.username}</span>
            <div className="flex items-center text-gray-500 gap-2">
              <span>{data.country}</span>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center gap-2">
        {Array(review.star)
          .fill()
          .map((_, i) => (
            <img
              src="/images/star.png"
              alt=""
              className="w-3.5 h-3.5"
              key={i}
            />
          ))}
        <span className="text-yellow-500 font-bold">{review.star}</span>
      </div>
      <p>{review.desc}</p>
      <div className="flex items-center gap-2">
        <span className="text-gray-700">Helpful?</span>
        <img
          src={like ? '/images/like.png' : '/images/likeColor.png'}
          alt=""
          className="w-3.5"
          onClick={handleLike}
        />
        <span className="text-gray-700">Yes</span>
        <img
          src={dislike ? '/images/dislike.png' : '/images/dislike_color.png'}
          alt=""
          className="w-3.5"
          onClick={handleDislike}
        />
        <span className="text-gray-700">No</span>
      </div>
    </div>
  );
};

export default Review;
