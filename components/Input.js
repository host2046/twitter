import Image from "next/image";
import userImage from "../public/image/myImage.jpg";
import { EmojiHappyIcon, PhotographIcon } from "@heroicons/react/outline";

const Input = () => {
  return (
    <div className="flex p-3 space-x-3">
      <Image
        className="w-11 h-11 rounded-full object-cover"
        src={userImage}
        alt="user-image"
      />
      <div className="w-full divide-y divide-gray-200">
        <div className="">
          <textarea
            className="w-full border-none focus:ring-0  min-h-[50px] text-lg tracking-wider placeholder-gray-700"
            rows="2"
            placeholder="What 's happening?"
          ></textarea>
        </div>
        <div className="flex items-center justify-between py-2.5">
          <div className="flex">
            <PhotographIcon className="w-10 h-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full" />
            <EmojiHappyIcon className="w-10 h-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full" />
          </div>
          <button className="px-4 py-1.5 shadow-md hover:brightness-95 disabled:opacity-50 bg-blue-400 rounded-full text-white font-bold">
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
