import { SearchIcon } from "@heroicons/react/outline";
import News from "./News";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Widgets = ({ newsResults, randomUsersResults }) => {
  const [articleNum, setArticleNum] = useState(3);
  const [randomUserNum, setRandomUserNum] = useState(3);
  const articleHandler = () => {
    setArticleNum(articleNum + 3);
  };

  return (
    <div className="xl:w-[600px] ml-8 space-y-5 hidden lg:inline">
      <div className="w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50 ">
        <div className="flex  items-center p-3 rounded-full  relative">
          <SearchIcon className="h-5 z-50 text-gray-500" />
          <input
            className="absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 placeholder-gray-500 focus:shadow-lg focus:bg-white bg-gray-100"
            type="text"
            placeholder="Search twitter"
          />
        </div>
      </div>
      <div className="text-gray-700 space-y-3 bg-gray-100 pt-2 rounded-xl w-[90%] xl:w-[75%] transition duration-700 ease-out">
        <h4 className="font-bold text-xl px-4">What is Happening</h4>
        <AnimatePresence>
          {newsResults.slice(0, articleNum).map((article) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
            >
              <News key={article.title} article={article} />
            </motion.div>
          ))}
        </AnimatePresence>
        <button
          onClick={articleHandler}
          className="text-blue-300 pb-3 pl-4 hover:text-blue-400"
        >
          show More
        </button>
      </div>
      <div className="text-gray-700 space-y-3 bg-gray-100 pt-2 rounded-xl w-[90%] xl:w-[75%] sticky top-16">
        <h4 className="font-bold text-xl px-4">Who to follow</h4>
        <AnimatePresence>
          {randomUsersResults.slice(0, randomUserNum).map((user) => (
            <motion.div
              key={user.login.username}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
            >
              <div
                key={user.login.username}
                className="flex items-center justify-between px-4 py-2 space-x-1 cursor-pointer hover:bg-gray-200 transition duration-200"
              >
                <img
                  className=" object-cover rounded-full"
                  width="40"
                  src={user.picture.thumbnail}
                  alt=""
                />
                <div className="truncate leading-5">
                  <h6 className="font-bold text-[14px]  hover:underline truncate">
                    {user.login.username}
                  </h6>
                  <h5 className="text-[13px] text-gray-500 truncate">
                    {user.name.first + " " + user.name.last}
                  </h5>
                </div>
                <button className="text-white px-3.5 py-1.5 bg-black rounded-full text-sm font-bold hover:brightness-95 ">
                  follow
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <button
          onClick={() => setRandomUserNum(randomUserNum + 3)}
          className="text-blue-300 pb-3 pl-4 hover:text-blue-400"
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default Widgets;
