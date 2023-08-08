import { useCookies } from "react-cookie";

export default function AuthHeader() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const adminEmail = cookies.Email;

  const signOut = () => {
    console.log("loged out");
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
  };

  return (
    <div className="flex flex-wrap justify-between items-center my-5">
      <p>Welcome back {adminEmail}</p>
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  );
}
