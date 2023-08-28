import { useCookies } from "react-cookie";
import "../../styles/Admin/AdminLayout.scss";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";

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
    <section id="logout-banner">
      <span className="md-only">Welcome back: {adminEmail}</span>
      <button onClick={() => signOut()} aria-label="Sign Out from Admin page">
        LOGOUT
        {/* <ArrowLeftOnRectangleIcon width={22} /> */}
      </button>
    </section>
  );
}
