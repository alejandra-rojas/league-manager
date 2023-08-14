import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
//Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Leagues from "./pages/admin/Leagues";
import Players, { playersData } from "./pages/admin/Players";
import PlayerDetails, {
  playerDetailsLoader,
} from "./pages/admin/PlayerDetails";
import PlayerError from "./pages/admin/PlayerError";
import Teams from "./pages/admin/Teams";

import NotFound from "./pages/NotFound";

//Layout
import RootLayout from "./layouts/RootLayout";
import AdminLayout from "./layouts/AdminLayout";
import PlayersLayout from "./layouts/PlayersLayout";

// Library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />

      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<Leagues />} />
        <Route
          path="players"
          element={<PlayersLayout />}
          errorElement={<PlayerError />}
        >
          <Route index loader={playersData} element={<Players />} />
          <Route
            path=":id"
            loader={playerDetailsLoader}
            element={<PlayerDetails />}
          />
        </Route>
        <Route path="teams" element={<Teams />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />;
      <ToastContainer />
    </>
  );
}

export default App;
