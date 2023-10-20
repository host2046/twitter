import Head from "next/head";
import Sidebar from "../components/Sidebar";

const index = () => {
  return (
    <div>
      <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="genrerated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen max-w-7xl mx-auto ">
        <Sidebar />
      </main>
    </div>
  );
};

export default index;
