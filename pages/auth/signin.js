import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { db } from "../../firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
const Signin = () => {
  const router = useRouter();
  const onGoogleClick = async () => {
    try {
      const auth = getAuth();

      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      const user = auth.currentUser.providerData[0];
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      console.log(user);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          username: user.displayName.split(" ").join("").toLocaleLowerCase(),
          userImage: user.photoURL,
          uid: user.uid,
          timestamp: serverTimestamp(),
        });
      }
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center mt-20 justify-center space-x-4">
      <img
        className="hidden md:inline-flex object-cover md:w-44 md:h-80 rotate-6"
        src="https://spy.family/wp-content/uploads/2022/12/ch12findtimelinepngtwimg1920.png"
        alt="Twitter Image in Twitter"
      />
      <div className="">
        <div className="flex flex-col items-center">
          <img
            className="w-36 object-cover rounded-lg"
            src="https://cdn.punchng.com/wp-content/uploads/2023/07/24084806/Twitter-new-logo.jpeg"
            alt="twitter logo"
          />
          <p className="text-center text-sm italic my-10">
            this app is creating for practice purposes
          </p>
          <button
            onClick={onGoogleClick}
            className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
          >
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
//https://twitter-6eqa0ecq2-alihost888-gmailcom.vercel.app/api/auth/callback/google
