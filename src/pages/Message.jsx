import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";

const Message = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  const { data: currentUserData } = useQuery({
    queryKey: ["seller"],
    queryFn: () =>
      newRequest.get(`/users/${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-5xl">
        <span className="text-sm text-gray-500">
          <Link to="/messages" className="text-blue-500">
            MESSAGES
          </Link>{" "}
          &gt; {id}
        </span>
        {isLoading ? (
          "Loading"
        ) : error ? (
          "Something went wrong"
        ) : (
          <div className="flex flex-col gap-5 my-6 p-6 h-96 overflow-y-scroll scrollbar-thumb-gray-400 scrollbar-thin">
            {data.map((m) => (
              <div
                className={`flex gap-5 max-w-lg ${
                  m.userId === currentUser._id ? "flex-row-reverse self-end" : ""
                }`}
                key={m._id}
              >
                <img
                  src="/images/noavtar.jpeg"
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p
                  className={`p-4 rounded-lg text-gray-600 ${
                    m.userId === currentUser._id
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-100 rounded-bl-none"
                  }`}
                >
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        )}
        <hr className="my-4 border-t border-gray-300" />
        <form className="flex gap-4" onSubmit={handleSubmit}>
          <textarea
            className="w-4/5 p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
            placeholder="Write a message"
            rows="3"
          ></textarea>
          <button
            type="submit"
            className="w-1/5 bg-green-500 text-white font-semibold py-4 rounded-lg hover:bg-green-600"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Message;
