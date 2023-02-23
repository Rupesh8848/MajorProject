import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MainContainer from "./Components/MainContainer";
import SliderSwitch from "./Components/SliderSwitch";
import Spinner from "./Components/Spinner";
import UploadModal from "./Components/UploadModal";
import { hideSpinner, showSpinner } from "./Slices/spinnerSlice";
import { setUser } from "./Slices/userSlice";

function App() {
  const dispatch = useDispatch();
  const [uploadModalVisible, setUploadModalVisible] = React.useState(false);

  const [loadStateComplete, setLoadStateComplete] = React.useState(false); //checks if the data has been loaded at the begining of the app

  const { spinnerState } = useSelector((state) => state.spinner);

  React.useEffect(() => {
    async function main() {
      setLoadStateComplete(false);
      await dispatch(setUser());
      setLoadStateComplete(true);
    }
    main();
  }, []);

  // console.log(User);

  if (!loadStateComplete) {
    dispatch(showSpinner());
  } else {
    dispatch(hideSpinner());
  }

  return (
    <>
      {spinnerState === "show" && <Spinner />}
      {loadStateComplete && (
        <div
          className={`${
            uploadModalVisible ? "h-[100vh] overflow-hidden" : null
          }`}
        >
          <button onClick={() => setUploadModalVisible(true)}>
            Upload Button
          </button>
          <SliderSwitch />
          <MainContainer />
          {uploadModalVisible && (
            <UploadModal modalVisToggler={setUploadModalVisible} />
          )}
          {spinnerState === "show" && <Spinner />}
        </div>
      )}
    </>
  );
}

export default App;
