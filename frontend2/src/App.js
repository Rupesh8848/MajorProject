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
import { getRecent } from "./Slices/recentSlice";

function App() {
  const dispatch = useDispatch();
  const [uploadModalVisible, setUploadModalVisible] = React.useState(false);

  const [loadStateComplete, setLoadStateComplete] = React.useState(false); //checks if the data has been loaded at the begining of the app

  const { spinnerState } = useSelector((state) => state.spinner);

  const { downloadList } = useSelector((state) => state.download);

  const [currentTab, setCurrentTab] = React.useState(1);

  React.useEffect(() => {
    async function main() {
      dispatch(showSpinner());
      setLoadStateComplete(false);
      await dispatch(setUser());
      dispatch(getRecent());
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
          {/* <span>
            {downloadList.length > 0 &&
              `${downloadList.length} files selected.`}
          </span>
          <span>{downloadList.length > 0 && <DownloadSelected />}</span> */}
          <div className="h-[100vh]">
            <Navbar />
            <main className="main flex">
              <SideBar
                setUploadModalVisible={setUploadModalVisible}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                className="sidebar z-0"
              />
              <MainContainer className="main-container" />
            </main>
          </div>

          {uploadModalVisible && (
            <UploadModal modalVisToggler={setUploadModalVisible} />
          )}
        </div>
      )}
    </>
  );
}

export default App;
