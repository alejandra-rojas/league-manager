import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

function Breadcrumbs() {
  const location = useLocation();

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, index, array) => {
      const currentLink = array.slice(0, index + 1).join("/");
      const isLast = index === array.length - 1;

      return (
        <li key={crumb} className={isLast ? "font-bold underline" : ""}>
          <Link
            to={currentLink}
            aria-current={isLast ? "page" : undefined}
            aria-label={
              isLast ? `Current page: ${crumb}` : `Navigate to: ${crumb}`
            }
          >
            {crumb}
          </Link>
        </li>
      );
    });

  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol className="flex gap-1 list-none p-0">
        {crumbs.map((crumb, index) => (
          <Fragment key={index}>
            {index > 0 && <span className="separator">{">"}</span>}
            {crumb}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
