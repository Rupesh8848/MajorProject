import axios from "axios";
import { ethers } from "ethers";
import React from "react";
import { baseUrl } from "../BaseUrl";
import { loaderContext } from "../Context/loaderContext";
import { UserContext } from "../Context/userContext";
import { Address } from "../Utils/ContractAddress";
import PublicABI from "../Utils/PublicABI.json";
import "./DeleteSelected.css";

export default function DeleteSelected({ selectedObjects }) {
  const { setLoaderState } = React.useContext(loaderContext);
  const { user } = React.useContext(UserContext);
  async function deleteSelected() {
    setLoaderState(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      Address.Publicupload[0],
      PublicABI.abi,
      signer
    );
    try {
      for (let obj of selectedObjects) {
        console.log(obj.original.cid);
        // console.log(user);
        try {
          const response = await contract.removecid(obj.original.cid);
          await response.wait();
          console.log(response);
          if (obj.original.type === "file") {
            await axios.delete(
              `${baseUrl}/api/file/${user._id}/${obj.original._id}`
            );
          }
        } catch (error) {
          console.log("error", error);
        }
      }
    } catch (error) {
      console.log("Error deleting file.");
    }
    setLoaderState(false);
  }
  return (
    <button onClick={deleteSelected} className="deleteButton">
      Delete Selected
    </button>
  );
}
