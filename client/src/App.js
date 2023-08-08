import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
//Pages
import Admin from "./pages/Admin";
import Home from "./pages/Home";

//Layout
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="admin" element={<Admin />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
