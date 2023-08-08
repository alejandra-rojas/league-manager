import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
//Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Players from "./pages/admin/Players";
import Teams from "./pages/admin/Teams";
import Leagues from "./pages/admin/Leagues";
import NotFound from "./pages/NotFound";

//Layout
import RootLayout from "./layouts/RootLayout";
import AdminLayout from "./layouts/AdminLayout";

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
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
