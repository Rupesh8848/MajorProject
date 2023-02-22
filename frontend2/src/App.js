import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MainContainer from "./Components/MainContainer";
// import { Routes, Route } from "react-router-dom";

import { setUser } from "./Slices/userSlice";
function App() {
  const dispatch = useDispatch();
  const { User } = useSelector((state) => state);

  const [loadState, setLoadState] = React.useState(false);

  React.useEffect(() => {
    async function main() {
      await dispatch(setUser());
      setLoadState(true);
    }
    main();
  }, []);

  // console.log(User);

  return (
    loadState && (
      <div>
        <MainContainer />
      </div>
    )
  );
}

export default App;
