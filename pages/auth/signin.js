import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";

const signin = ({ providers }) => {
  const router = useRouter();
  return (
    <>
      {providers ? (
        <div className="flex items-center mt-20 justify-center space-x-4">
          <img
            className="hidden md:inline-flex object-cover md:w-44 md:h-80 rotate-6"
            src="https://spy.family/wp-content/uploads/2022/12/ch12findtimelinepngtwimg1920.png"
            alt="Twitter Image in Twitter"
          />
          <div className="">
            {Object.values(providers).map((provider) => (
              <div key={provider.name} className="flex flex-col items-center">
                <img
                  className="w-36 object-cover rounded-lg"
                  src="https://cdn.punchng.com/wp-content/uploads/2023/07/24084806/Twitter-new-logo.jpeg"
                  alt="twitter logo"
                />
                <p className="text-center text-sm italic my-10">
                  this app is creating for practice purposes
                </p>
                <button
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                  className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
                >
                  Sign In with {provider.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <button onClick={() => router.push("/")}>SignIn</button>
      )}
    </>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
export default signin;
//https://twitter-6eqa0ecq2-alihost888-gmailcom.vercel.app/api/auth/callback/google
