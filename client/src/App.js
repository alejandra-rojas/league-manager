import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
//Pages
import Admin from "./pages/admin/Leagues";
import Home from "./pages/Home";

//Layout
import RootLayout from "./layouts/RootLayout";
import About from "./pages/About";
import AdminLayout from "./layouts/AdminLayout";
import Players from "./pages/admin/Players";
import Teams from "./pages/admin/Teams";
import Leagues from "./pages/admin/Leagues";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="admin" element={<AdminLayout />}>
        <Route path="leagues" element={<Leagues />} />
        <Route path="players" element={<Players />} />
        <Route path="teams" element={<Teams />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
