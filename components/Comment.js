import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";

import { signIn, useSession } from "next-auth/react";

import Moment from "react-moment";

import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { modalAction, postIdAction } from "../store";
import { useRouter } from "next/router";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useRecoilState } from "recoil";
import { userState } from "../atom/userAtom";

const Comment = ({ comment, initalPostId, commentId }) => {
  const disPatch = useDispatch();
  const [currentUser] = useRecoilState(userState);
  const [likes, setLikes] = useState([]);

  const [hasLiked, setHasLiked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsbscribe = onSnapshot(
      collection(db, "posts", initalPostId, "comments", commentId, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db, initalPostId, commentId]);

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === currentUser?.uid) !== -1);
  }, [likes, currentUser]);

  const likeComment = async () => {
    if (currentUser) {
      if (hasLiked) {
        await deleteDoc(
          doc(
            db,
            "posts",
            initalPostId,
            "comments",
            commentId,
            "likes",
            currentUser?.uid
          )
        );
      } else {
        await setDoc(
          doc(
            db,
            "posts",
            initalPostId,
            "comments",
            commentId,
            "likes",
            currentUser?.uid
          ),
          {
            username: currentUser.username,
          }
        );
      }
    } else {
      router.push("/auth/signin");
    }
  };
  const deleteComment = async () => {
    if (window.confirm("Are you sure to delete this comment?")) {
      deleteDoc(doc(db, "posts", initalPostId, "comments", commentId));
    }
  };

  const commentHandler = () => {
    if (currentUser) {
      disPatch(postIdAction.setPostId(initalPostId));
      disPatch(modalAction.setOpen());
    } else {
      router.push("/auth/signin");
    }
  };
  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
      {/* user image */}
      <img
        className="h-11 w-11 rounded-full mr-4"
        src={comment?.data()?.userImage}
        alt="user-img"
      />
      {/* right side */}
      <div className="flex-1">
        {/* Header */}

        <div className="flex items-center justify-between">
          {/* post user info */}
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {comment?.data().name}
            </h4>
            <span className="text-sm sm:text-[15px]">
              @{comment?.data().username} -
            </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>{comment?.timestamps?.toDate()}</Moment>
            </span>
          </div>

          {/* dot icon */}
          <DotsHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2 " />
        </div>

        {/* post text */}

        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">
          {comment?.data().comment}
        </p>

        {/* icons */}

        <div className="flex justify-between text-gray-500 p-2">
          <div className="flex items-center">
            <ChatIcon
              onClick={commentHandler}
              className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
            />
          </div>
          {currentUser?.uid === comment?.data().userId && (
            <TrashIcon
              onClick={deleteComment}
              className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
            />
          )}

          <div className="flex items-center">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likeComment}
                className="h-9 w-9 p-2  text-red-600 hoverEffect hover:bg-red-100"
              />
            ) : (
              <HeartIcon
                onClick={likeComment}
                className=" h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
              />
            )}
            {likes.length > 0 && (
              <span className={`${hasLiked && "text-red-600"} text-sm`}>
                {likes.length}
              </span>
            )}
          </div>

          <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
};

export default Comment;
