import Image from "next/image";

import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import SideBarMenuItem from "./SidebarMenuItem";
import { signIn, signOut, useSession } from "next-auth/react";

const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full pl-24">
      <div className="hoverEffect p-0 hover:bg-blue-100 xl:p-1.5 ">
        <Image
          className="rounded-full"
          width="50"
          height="50"
          src="https://cdn.punchng.com/wp-content/uploads/2023/07/24084806/Twitter-new-logo.jpeg"
          alt="tweet-logo"
        />
      </div>
      <div className="mt-4 mb-2.5 xl:items-start">
        <SideBarMenuItem text="Home" Icon={HomeIcon} active />
        <SideBarMenuItem text="Explore" Icon={HashtagIcon} />
        {session && (
          <>
            <SideBarMenuItem text="Notifications" Icon={BellIcon} />
            <SideBarMenuItem text="Messages" Icon={InboxIcon} />
            <SideBarMenuItem text="BookMarks" Icon={BookmarkIcon} />
            <SideBarMenuItem text="Lists" Icon={ClipboardIcon} />
            <SideBarMenuItem text="Profile" Icon={UserIcon} />
            <SideBarMenuItem text="More" Icon={DotsCircleHorizontalIcon} />
          </>
        )}
      </div>
      {session ? (
        <>
          <button className="hidden xl:inline w-56 h-12 bg-blue-400 rounded-full hover:brightness-95 shadow-md text-white font-bold text-lg">
            Tweet
          </button>
          <div className="hoverEffect flex items-center justify-center mt-auto xl:justify-start">
            <img
              onClick={signOut}
              className="w-11 h-11 rounded-full object-cover"
              src={session.user.image}
              alt="my Image"
            />
            <div className="leading-5 hidden xl:inline ml-2">
              <h4 className="font-bold">{session.user.name}</h4>
              <p className="text-gray-500">@{session.user.username}</p>
            </div>
            <DotsHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
          </div>
        </>
      ) : (
        <button
          onClick={signIn}
          className="hidden xl:inline w-36 h-12 bg-blue-400 rounded-full hover:brightness-95 shadow-md text-white font-bold text-lg"
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default Sidebar;
