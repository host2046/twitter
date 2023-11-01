import { getProviders, signIn } from "next-auth/react";

const signin = ({ providers }) => {
  return (
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
              className="w-36 object-cover"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/220px-Logo_of_Twitter.svg.png"
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
