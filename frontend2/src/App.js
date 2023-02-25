import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DownloadSelected from "./Components/DownloadSelected";
import MainContainer from "./Components/MainContainer";
import Navbar from "./Components/Navbar";
import SideBar from "./Components/SideBar";
import Spinner from "./Components/Spinner";
import UploadModal from "./Components/UploadModal";
import { hideSpinner, showSpinner } from "./Slices/spinnerSlice";
import { setUser } from "./Slices/userSlice";
import "./App.styles.css";

function App() {
  const dispatch = useDispatch();
  const [uploadModalVisible, setUploadModalVisible] = React.useState(false);

  const [loadStateComplete, setLoadStateComplete] = React.useState(false); //checks if the data has been loaded at the begining of the app

  const { spinnerState } = useSelector((state) => state.spinner);

  const { downloadList } = useSelector((state) => state.download);

  React.useEffect(() => {
    async function main() {
      dispatch(showSpinner());
      setLoadStateComplete(false);
      await dispatch(setUser());
      setLoadStateComplete(true);
      dispatch(hideSpinner());
    }
    main();
  }, []);

  // console.log(User);

  return (
    <>
      {spinnerState === "show" && <Spinner />}
      {loadStateComplete && (
        <div
          className={`${
            uploadModalVisible ? "h-[100vh] overflow-hidden" : null
          }`}
        >
          <Navbar />
          <span>
            {downloadList.length > 0 &&
              `${downloadList.length} files selected.`}
          </span>
          <span>{downloadList.length > 0 && <DownloadSelected />}</span>
          <main className="main">
            <SideBar
              setUploadModalVisible={setUploadModalVisible}
              className="sidebar"
            />
            <MainContainer className="main-container" />
          </main>
          {uploadModalVisible && (
            <UploadModal modalVisToggler={setUploadModalVisible} />
          )}
        </div>
      )}
    </>
  );
}

export default App;
