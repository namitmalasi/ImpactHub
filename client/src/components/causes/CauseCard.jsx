import React from "react";
import {
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import useCauseStore from "../../store/causeStore";
import useAuthStore from "../../store/authStore";

const CauseCard = ({ cause }) => {
  const { likeCause } = useCauseStore();
  const { user } = useAuthStore();

  const isLiked = cause.likes.includes(user?._id);
  const progress = (cause.raisedAmount / cause.targetAmount) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={cause.image || "/placeholder-cause.jpg"}
        alt={cause.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <div className="flex items-center mb-2">
          <img
            src={cause.creator.avatar || "/placeholder-avatar.jpg"}
            alt={cause.creator.name}
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="text-sm text-gray-600">{cause.creator.name}</span>
        </div>

        <h3 className="text-xl font-semibold mb-2">{cause.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{cause.description}</p>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>${cause.raisedAmount.toLocaleString()}</span>
            <span>${cause.targetAmount.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 rounded-full h-2"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <button
            onClick={() => likeCause(cause._id)}
            className="flex items-center text-gray-600 hover:text-indigo-600"
          >
            {isLiked ? (
              <HeartSolidIcon className="h-5 w-5 text-red-500" />
            ) : (
              <HeartIcon className="h-5 w-5" />
            )}
            <span className="ml-1">{cause.likes.length}</span>
          </button>

          <button className="flex items-center text-gray-600 hover:text-indigo-600">
            <ChatBubbleLeftIcon className="h-5 w-5" />
            <span className="ml-1">{cause.comments.length}</span>
          </button>

          <button className="flex items-center text-gray-600 hover:text-indigo-600">
            <ShareIcon className="h-5 w-5" />
          </button>

          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Donate
          </button>
        </div>
      </div>
    </div>
  );
};

export default CauseCard;
