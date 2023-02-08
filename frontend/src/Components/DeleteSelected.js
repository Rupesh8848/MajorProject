import axios from "axios";
import { ethers } from "ethers";
import React from "react";
import { baseUrl } from "../BaseUrl";
import { loaderContext } from "../Context/loaderContext";
import { Address } from "../Utils/ContractAddress";
import PublicABI from "../Utils/PublicABI.json";

export default function DeleteSelected({ selectedObjects }) {
  const { setLoaderState } = React.useContext(loaderContext);
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
        try {
          const response = await contract.removecid(obj.original.cid);
          await response.wait();
          console.log(response);
          if (obj.original.type === "file") {
            await axios.delete(`${baseUrl}/api/file/${obj.original._id}`);
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
  return <button onClick={deleteSelected}>Delete Selected</button>;
}
