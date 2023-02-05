import React from "react";
import Modal from "./Components/Modal";
import Spinner from "./Components/Spinner";
import BasicTable from "./Components/Table";
import { loaderContext } from "./Context/loaderContext";
import { UserContext } from "./Context/userContext";
import { connectMetaMask } from "./setup";
import axios from "axios";
import { baseUrl } from "./BaseUrl";

function App() {
  const [modalState, setModalState] = React.useState("hide");
  const [columnSearchStatus, setColumnSearchStatus] = React.useState(false);

  const [intialLoading, setInitialLoading] = React.useState(true);
  const { user, setUser } = React.useContext(UserContext);
  const { loaderState, setLoaderState } = React.useContext(loaderContext);

  React.useEffect(() => {
    async function main() {
      setLoaderState(true);
      await connectMetaMask().then(async (User) => {
        setUser(User);
        // console.log(User);
        await fetchUserFromBackendDB(User);
        console.log(user);
        setInitialLoading(false);
        setLoaderState(false);
      });
    }
    main();
  }, []);

  async function fetchUserFromBackendDB(User) {
    const data = await axios.get(`${baseUrl}/api/user/${User}`);
    console.log(data.data);
    setUser(data.data);
  }

  return (
    <div className="App">
      {loaderState && <Spinner />}
      {modalState === "show" && <Modal setModalState={setModalState} />}

      {/* main app  */}
      {!intialLoading && (
        <div>
          <button
            onClick={() => {
              setModalState("show");
            }}
          >
            Upload
          </button>

          <button
            onClick={() => {
              setColumnSearchStatus((oldStatus) => !oldStatus);
            }}
          >
            Column Search
          </button>

          <BasicTable
            cloumnSearchStatus={columnSearchStatus}
            tableData={user.rootDirectory}
          />
        </div>
      )}
    </div>
  );
}

export default App;
