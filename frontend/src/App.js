import React from "react";
import Modal from "./Components/Modal";
import Spinner from "./Components/Spinner";
import BasicTable from "./Components/Table";
import { loaderContext } from "./Context/loaderContext";
import { UserContext } from "./Context/userContext";
import { connectMetaMask } from "./setup";
import axios from "axios";
import { baseUrl } from "./BaseUrl";
import { tableContext } from "./Context/tableDataContext";
import { modalContext } from "./Context/modalContext";
import { DropZone } from "./Components/DropZone";
import "./App.css";
import SliderSwitch from "./Components/SliderSwitch";

import { getPublicKey, encKeywithPublic, decKeywithPrivate } from './Functions/Functions'

function App() {
  const [columnSearchStatus, setColumnSearchStatus] = React.useState(false);
  const { modalState, setModalState } = React.useContext(modalContext);
  const [intialLoading, setInitialLoading] = React.useState(true);
  const { user, setUser } = React.useContext(UserContext);
  const { loaderState, setLoaderState } = React.useContext(loaderContext);

  const { settableState } = React.useContext(tableContext);
  React.useEffect(() => {
    async function main() {
      setLoaderState(true);
      await connectMetaMask().then(async (User) => {
        setUser(User);
        // console.log(User);
        await fetchUserFromBackendDB(User);
        // console.log(user);
        setInitialLoading(false);
        setLoaderState(false);
      });
    }
    main();
    getPublicKey();
  }, []);

  async function fetchUserFromBackendDB(User) {
    const data = await axios.get(`${baseUrl}/api/user/${User}`);
    console.log(data.data);
    setUser(data.data);
    settableState([...data.data.files, ...data.data.folders]);
  }

  return (
    <div className="App">
      {loaderState && <Spinner />}
      {modalState === "show" && (
        <Modal>
          <DropZone />
        </Modal>
      )}

      {/* main app  */}
      {!intialLoading && (
        <div className="main">
          <div className="header-buttons">
            <button
              onClick={() => {
                setModalState("show");
              }}
              className="upload-button"
            >
              Upload
            </button>

            <div>
              <SliderSwitch />
            </div>
            <button
              onClick={() => {
                setColumnSearchStatus((oldStatus) => !oldStatus);
              }}
              className="columnSearch"
            >
              Column Search
            </button>
          </div>

          <BasicTable cloumnSearchStatus={columnSearchStatus} user={user} />
        </div>
      )}
    </div>
  );
}

export default App;
