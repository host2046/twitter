import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";
import CommentModal from "../components/CommentModal";

const Home = ({ newsResults, randomUsersResults }) => {
  return (
    <div>
      <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="genrerated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen  mx-auto ">
        <Sidebar />
        <Feed />
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

export default Home;
