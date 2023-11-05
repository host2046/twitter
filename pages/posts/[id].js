import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import Widgets from "../../components/Widgets";
import CommentModal from "../../components/CommentModal";

import { useRouter } from "next/router";
import {
  ArrowLeftIcon,
  BackspaceIcon,
  SparklesIcon,
} from "@heroicons/react/outline";
import Input from "../../components/Input";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Post from "../../components/Post";
import Comment from "../../components/Comment";

const PostPage = ({ newsResults, randomUsersResults }) => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);

  // get data

  useEffect(
    () => onSnapshot(doc(db, "posts", id), (snapshot) => setPost(snapshot)),
    [db, id]
  );

  // get commnets

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db, id]);

  return (
    <div>
      <Head>
        <title>Post Page</title>
        <meta name="description" content="genrerated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen  mx-auto ">
        <Sidebar />
        <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
          <div className="flex items-center space-x-2  py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
            <div onClick={() => router.push("/")} className=" hoverEffect">
              <ArrowLeftIcon className="h-6  " />
            </div>
            <h2 className="text-lg sm:text-xl font-bold cursor-pointer">
              Tweet
            </h2>
          </div>
          <Post id={id} post={post} />
          {}
          {comments.length > 0 &&
            comments.map((comment) => (
              <Comment
                key={comment.id}
                initalPostId={id}
                commentId={comment.id}
                comment={comment}
              />
            ))}
        </div>

        <Widgets
          newsResults={newsResults.articles}
          randomUsersResults={randomUsersResults.results}
        />
        <CommentModal />
      </main>
    </div>
  );
};
// https://saurav.tech/NewsAPI/top-headlines/category/business/us.json

export async function getServerSideProps() {
  const newsResults = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
  ).then((res) => res.json());

  // who to follow section

  const randomUsersResults = await fetch(
    "https://randomuser.me/api/?results=20&inc=name,login,picture"
  ).then((res) => res.json());

  return {
    props: {
      newsResults,
      randomUsersResults,
    },
  };
}

export default PostPage;
