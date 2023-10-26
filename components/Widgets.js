import { SearchIcon } from "@heroicons/react/outline";
import News from "./News";
import { useState } from "react";

const Widgets = ({ newsResults }) => {
  const [articleNum, setArticleNum] = useState(3);
  const articleHandler = () => {
    setArticleNum((prev) => prev + 3);
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
      <div className="text-gray-700 space-y-3 bg-gray-100 pt-2 rounded-xl w-[90%] xl:w-[75%] ">
        <h4 className="font-bold text-xl px-4">What is Happening</h4>

        {newsResults.slice(0, articleNum).map((article) => (
          <News key={article.title} article={article} />
        ))}
        <button
          onClick={articleHandler}
          className="text-blue-300 pb-3 pl-4 hover:text-blue-400"
        >
          show More
        </button>
      </div>
    </div>
  );
};

export default Widgets;
