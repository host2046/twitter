import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { modalAction } from "../store";
import {
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";

import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";

import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { userState } from "../atom/userAtom";

const CommentModal = () => {
  const open = useSelector((state) => state.modal.modalIsOpen);
  const disPatch = useDispatch();
  const postId = useSelector((state) => state.postId.value);
  const [post, setPost] = useState({});
  const [currentUser] = useRecoilState(userState);
  const [input, setInput] = useState("");

  const router = useRouter();

  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), (snapshot) => setPost(snapshot));
  }, [postId, db]);

  const sendComment = async () => {
    await addDoc(collection(db, "posts", postId, "comments"), {
      comment: input,
      name: currentUser.name,
      username: currentUser.username,
      userImage: currentUser.userImage,
      timestamp: serverTimestamp(),
      userId: currentUser.uid,
    });

    disPatch(modalAction.setOpen(false));
    setInput("");
    router.push(`/posts/${postId}`);
  };
  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => disPatch(modalAction.setOpen(false))}
          className="w-[90%]  max-w-xl absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2    rounded-xl shadow-md"
        >
          <div className="p-1">
            <div className="border-b-2 border-gray-200 py-2 px-1.5">
              <div
                onClick={() => disPatch(modalAction.setOpen(false))}
                className="w-11 h-11  flex items-center justify-center hoverEffect "
              >
                <XIcon className=" text-gray-700 " />
              </div>
            </div>
            <div className="p-2 flex items-center space-x-1 relative">
              <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300" />
              <img
                className="h-11 w-11 rounded-full mr-4"
                src={post?.data()?.userImage}
                alt="user-img"
              />
              <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                {post.data()?.name}
              </h4>
              <span className="text-sm sm:text-[15px]">
                @{post.data()?.username} -
              </span>
              <span className="text-sm sm:text-[15px] hover:underline">
                <Moment fromNow>{post?.data()?.timestamps?.toDate()}</Moment>
              </span>
            </div>
            <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2  ml-16">
              {post?.data()?.text}
            </p>
            <div className="flex p-3 space-x-3">
              <img
                className="w-11 h-11 rounded-full object-cover cursor-pointer"
                src={currentUser.userImage}
                alt="user-image"
              />
              <div className="w-full ">
                <div className="">
                  <textarea
                    className="w-full border-none focus:ring-0  min-h-[50px] text-lg tracking-wider placeholder-gray-700"
                    rows="2"
                    placeholder="tweet your reply..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex items-center justify-between py-2.5">
                  <>
                    <div className="flex">
                      {/* <div
                        className=""
                        onClick={() => filePickerRef.current.click()}
                      > */}
                      <PhotographIcon className="hoverEffect w-10 h-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full" />
                      {/* <input
                          type="file"
                          hidden
                          ref={filePickerRef}
                          onChange={addImageToPost}
                        />
                      </div> */}
                      <EmojiHappyIcon className="hoverEffect w-10 h-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full" />
                    </div>
                    <button
                      onClick={sendComment}
                      disabled={!input.trim()}
                      className="px-4 py-1.5 shadow-md hover:brightness-95 disabled:opacity-50 bg-blue-400 rounded-full text-white font-bold"
                    >
                      Reply
                    </button>
                  </>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CommentModal;
