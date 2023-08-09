import { Link, useLocation } from "react-router-dom";

function Breadcrumbs() {
  const location = useLocation();

  let currentLink = "";
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink = +`/${crumb}`;

      return (
        <div
          key={crumb}
          className="after:content-['>'] after:last-child:content-['']"
        >
          <Link to={currentLink}>{crumb}</Link>
        </div>
      );
    });

  return <div className="flex gap-6 ">{crumbs}</div>;
}

export default Breadcrumbs;
