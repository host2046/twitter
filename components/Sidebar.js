import Image from "next/image";
import SidebarMenuItem from "./SidebarMenuItem";
import { HomeIcon } from "@heroicons/react/solid";
import userImage from "../public/image/myImage.jpg";
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
const Sidebar = () => (
  <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full">
    <div className="hoverEffect p-0 hover:bg-blue-100 xl:p-1.5 ">
      <Image
        width="50"
        height="50"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/220px-Logo_of_Twitter.svg.png"
        alt="twitter"
      />
    </div>

    <div className='mt-4 mb-2.5 xl:items-start'>
      <SidebarMenuItem text="Home" Icon={HomeIcon} active />
      <SidebarMenuItem text="Explore" Icon={HashtagIcon} />
      <SidebarMenuItem text="Notifications" Icon={BellIcon} />
      <SidebarMenuItem text="Messages" Icon={InboxIcon} />
      <SidebarMenuItem text="Bookmarks" Icon={BookmarkIcon} />
      <SidebarMenuItem text="Lists" Icon={ClipboardIcon} />
      <SidebarMenuItem text="Profile" Icon={UserIcon} />
      <SidebarMenuItem text="More" Icon={DotsCircleHorizontalIcon} />
    </div>
    <button className="hidden  xl:inline w-56 h-12 bg-blue-400 text-white rounded-full hover:brightness-95 font-bold shadow-md text-lg  ">
      Tweet
    </button>

    <div className="hoverEffect flex  items-center justify-center mt-auto xl:justify-start">
      <Image
        style={{
          borderRadius: "50%",
          objectFit: "cover",
          marginRight: '0.6rem'
       
        }}
        width="40"
        height="40"
        src={userImage}
        alt="userimage"
      />

      <div className='leading-5 hidden xl:inline'>
        <h4 className="font-bold">Ali Mizbani</h4>
        <p className='text-gray-500'>@codewithalimizbani</p>
      </div>
        <DotsHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
    </div>
  </div> 
);

export default Sidebar;
