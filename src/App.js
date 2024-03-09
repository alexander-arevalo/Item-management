// App.js

import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout.js";
import Home from "./pages/Home/Home.js";
import AddItems from "./pages/AddItem/Addtems.js";
import Items from "./pages/Home/Item/Items.js";
import UpdateItem from "./pages/Home/UpdateItem/UpdateItem.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="addItems" element={<AddItems />} />
          <Route path="home/:uuid" element={<Items />} />
          <Route path="home/:uuid/edit" element={<UpdateItem />} />{" "}
        </Route>
      </Routes>
    </>
  );
}

export default App;
