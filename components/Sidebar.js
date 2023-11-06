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
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

import { useRecoilState } from "recoil";
import { userState } from "../atom/userAtom";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  console.log(currentUser);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", auth.currentUser.providerData[0].uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCurrentUser(docSnap.data());
        }
      }
    });
  }, []);
  const onSignOut = () => {
    signOut(auth);
    setCurrentUser(null);
  };
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
        {currentUser && (
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
      {currentUser ? (
        <>
          <button className="hidden xl:inline w-56 h-12 bg-blue-400 rounded-full hover:brightness-95 shadow-md text-white font-bold text-lg">
            Tweet
          </button>
          <div className="hoverEffect flex items-center justify-center mt-auto xl:justify-start">
            <img
              onClick={onSignOut}
              className="w-11 h-11 rounded-full object-cover"
              src={currentUser?.userImage}
              alt="my Image"
            />
            <div className="leading-5 hidden xl:inline ml-2">
              <h4 className="font-bold">{currentUser?.name}</h4>
              <p className="text-gray-500">@{currentUser?.username}</p>
            </div>
            <DotsHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
          </div>
        </>
      ) : (
        <button
          onClick={() => router.push("/auth/signin")}
          className="hidden xl:inline w-36 h-12 bg-blue-400 rounded-full hover:brightness-95 shadow-md text-white font-bold text-lg"
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default Sidebar;
