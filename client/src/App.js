import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
//Pages
import Home from "./pages/Home";
import About from "./pages/About";

//Leagues Pages
import Leagues from "./pages/admin/Leagues";
import LeaguesUpcoming from "./pages/admin/LeaguesUpcoming";
import LeaguesFinished from "./pages/admin/LeaguesFinished";
import Players from "./pages/admin/Players";
import PlayerDetails, {
  playerDetailsLoader,
} from "./pages/admin/PlayerDetails";
import PlayerError from "./pages/admin/PlayerError";
import Teams from "./pages/admin/Teams";

import NotFound from "./pages/NotFound";

//Layout
import RootLayout from "./layouts/RootLayout";
import AdminLayout from "./layouts/AdminLayout";
import LeaguesLayout from "./layouts/LeaguesLayout";
import PlayersLayout from "./layouts/PlayersLayout";
import TeamsLayout from "./layouts/TeamsLayout";

// Library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TeamDetails, { teamDetailsLoader } from "./pages/admin/TeamDetails";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />

      <Route path="admin" element={<AdminLayout />}>
        <Route path="leagues" element={<LeaguesLayout />}>
          <Route index element={<Leagues />} />
          <Route path="upcoming" element={<LeaguesUpcoming />} />
          <Route path="finished" element={<LeaguesFinished />} />
        </Route>
        <Route
          path="players"
          element={<PlayersLayout />}
          errorElement={<PlayerError />}
        >
          <Route index element={<Players />} />
          <Route
            path=":id"
            element={<PlayerDetails />}
            loader={playerDetailsLoader}
          />
        </Route>
        <Route path="teams" element={<TeamsLayout />}>
          <Route index element={<Teams />} />
          <Route
            path=":id"
            element={<TeamDetails />}
            loader={teamDetailsLoader}
          />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
