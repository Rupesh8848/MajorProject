import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Routes, Route } from "react-router-dom";

import { setUser } from "./Slices/userSlice";
function App() {
  const dispatch = useDispatch();
  const { User } = useSelector((state) => state);

  React.useEffect(() => {
    async function main() {
      await dispatch(setUser());
    }
    main();
  }, []);

  console.log(User);

  return <div className="App"></div>;
}

export default App;
