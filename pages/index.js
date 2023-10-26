import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";

const Home = ({ newsResults }) => {
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
        <Widgets newsResults={newsResults.articles} />
      </main>
    </div>
  );
};
// https://saurav.tech/NewsAPI/top-headlines/category/business/us.json

export async function getServerSideProps() {
  const res = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
  );
  const newsResults = await res.json();
  return {
    props: {
      newsResults,
    },
  };
}

export default Home;
