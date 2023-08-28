import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function AccessibleNavigationAnnouncer() {
  // the message that will be announced
  const [message, setMessage] = useState("");
  // get location from router
  const location = useLocation();

  // only run this when location change (note the dependency [location])
  useEffect(() => {
    // ignore the /
    if (location.pathname.slice(1)) {
      // make sure navigation has occurred and screen reader is ready
      setTimeout(
        () => setMessage(`Navigated to ${location.pathname.slice(1)} page.`),
        500
      );
    } else {
      // in my case, / redirects to /dashboard, so I found it better to
      // just ignore the / route
      setMessage("");
    }
  }, [location]);

  return (
    <span
      className="sr-only"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {message}
    </span>
  );
}

export default AccessibleNavigationAnnouncer;
