import { useCookies } from "react-cookie";
import "../../styles/Admin/AdminLayout.scss";

export default function AuthHeader() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const adminEmail = cookies.Email;

  const signOut = () => {
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
    console.log("cookies removed, admin logged out");
  };

  return (
    <section id="logout-banner">
      <span className="md-only">Welcome back: {adminEmail}</span>
      <button onClick={() => signOut()} aria-label="Sign Out from Admin page">
        LOGOUT
      </button>
    </section>
  );
}
