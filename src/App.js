import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Create from "./pages/Create";
import Home from "./pages/Home";
import { AnimatePresence } from "framer-motion";
import { Routes, Route } from "react-router-dom";
import { getAllItems } from "./utils/firebaseFunction";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";
import Menu from "./components/Menu";
import Cart from "./components/Cart";

function App() {
  const [{ items, cartShow }, dispatch] = useStateValue();
  const [showSearch, setshowSearch] = useState(false)

  const fetchItems = async () => {
    await getAllItems().then((data) => {
      dispatch({
        type: actionType.SET_ITEMS,
        items: data,
      });
    });
  };
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />
        <main className="mt-20 md:mt-20 px-4 md:px-16 y-4 w-full">
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  <>
                    <Home />
                    <Menu showSearch={false} />
                  </>
                }
              />
              <Route path="/menu" element={<Menu showSearch={true} />} />
            </Route>
            <Route path="/create" element={<Create />} />
          </Routes>
          {cartShow && <Cart />}
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
