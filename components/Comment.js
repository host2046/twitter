import { XIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import React from "react";
import Moment from "react-moment";

const Comment = ({ comment, id }) => {
  return (
    <div className="flex items-center  p-3 cursor-pointer border-b border-gray-200">
      <img
        className="h-11 w-11 rounded-full mr-4"
        src={comment?.data()?.userImage}
        alt="user-img"
      />
      <div className="flex items-center space-x-1 whitespace-nowrap">
        <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
          {comment?.data()?.name}
        </h4>
        <span className="text-sm sm:text-[15px]">
          @{comment?.data()?.username} -
        </span>
        <span className="text-sm sm:text-[15px] hover:underline">
          <Moment fromNow>{comment?.data()?.timestamps?.toDate()}</Moment>
        </span>
      </div>
    </div>
  );
};

export default Comment;
