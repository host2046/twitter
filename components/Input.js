import {
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useRef, useState } from "react";

import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRecoilState } from "recoil";
import { userState } from "../atom/userAtom";
import { getAuth, signOut } from "firebase/auth";

const Input = () => {
  const [input, setInput] = useState("");
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const auth = getAuth();
  const [isLoading, setIsloading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);
  const sendPost = async () => {
    setIsloading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      id: currentUser.uid,
      text: input,
      userImage: currentUser.userImage,
      timestamps: serverTimestamp(),
      name: currentUser.name,
      username: currentUser.username,
    });
    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const dwonloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: dwonloadURL,
        });
      });
    }
    setInput("");
    setSelectedFile(null);
    setIsloading(false);
  };
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };
  const onSignOut = () => {
    signOut(auth);
    setCurrentUser(null);
  };
  return (
    <>
      {currentUser && (
        <div className="flex p-3 space-x-3 border-b border-gray-200">
          <img
            onClick={onSignOut}
            className="w-11 h-11 rounded-full object-cover cursor-pointer"
            src={currentUser?.userImage}
            alt="user-image"
          />
          <div className="w-full divide-y divide-gray-200">
            <div className="">
              <textarea
                className="w-full border-none focus:ring-0  min-h-[50px] text-lg tracking-wider placeholder-gray-700"
                rows="2"
                placeholder="What's happening?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
            </div>
            {selectedFile && (
              <div className="relative">
                <XIcon
                  onClick={() => setSelectedFile(null)}
                  className="h-7 text-white border border-white absolute rounded-full m-1 cursor-pointer"
                />
                <img
                  src={selectedFile}
                  className={`${isLoading && "animate-pulse"}`}
                />
              </div>
            )}
            <div className="flex items-center justify-between py-2.5">
              {!isLoading && (
                <>
                  <div className="flex">
                    <div
                      className=""
                      onClick={() => filePickerRef.current.click()}
                    >
                      <PhotographIcon className="hoverEffect w-10 h-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full" />
                      <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                      />
                    </div>
                    <EmojiHappyIcon className="hoverEffect w-10 h-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full" />
                  </div>
                  <button
                    onClick={sendPost}
                    disabled={!input.trim()}
                    className="px-4 py-1.5 shadow-md hover:brightness-95 disabled:opacity-50 bg-blue-400 rounded-full text-white font-bold"
                  >
                    Tweet
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Input;
