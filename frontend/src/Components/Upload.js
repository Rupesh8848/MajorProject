import { ethers } from "ethers";
import React from "react";
import { Web3Storage } from "web3.storage";
import { loaderContext } from "../Context/loaderContext";
import { UserContext } from "../Context/userContext";
import { Address } from "../Utils/ContractAddress";
import PublicABI from "../Utils/PublicABI.json";
import axios from "axios";
import { baseUrl } from "../BaseUrl";
import { uploadFileToDb, uploadFileToFolder } from "../Functions/uploadToDB";

export default function Upload({ files }) {
  const { setLoaderState } = React.useContext(loaderContext);
  const [createFolder, setCreateFolder] = React.useState(false);
  const [folderName, setFolderName] = React.useState("");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY2NGIxYmM5M2I3QzEwMTkyZmM1Mjg5N2M1MWQ1QUY4N0EzRDVGNEEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzU0MzM5OTYzNDEsIm5hbWUiOiJ0ZXN0In0.9dzODdrxRqXyG_kt-4Uc5g_7Pu-ZOyfjq6YcqnehAh0";

  const client = new Web3Storage({ token });

  const { user } = React.useContext(UserContext);

  async function handleFileUpload() {
    setLoaderState(true);
    // const fileCids = files.map(async (file) => {
    //   const cid = await client.put([file]);
    //   return {
    //     cid,
    //     name: file?.name,
    //   };
    // });

    const fileCids = [];

    for (let file of files) {
      const cid = await client.put([file]);
      fileCids.push({ cid, name: file.name, size: file.size });
    }

    console.log(fileCids);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      Address.Publicupload[0],
      PublicABI.abi,
      signer
    );
    try {
      console.log(fileCids);
      if (createFolder) {
        var folderObj = await axios.post(`${baseUrl}/api/folder`, {
          name: folderName,
          user,
        });
      }
      for (let fileObj of fileCids) {
        // const response = await contract.addcid(fileObj.cid, fileObj.name);
        // await response.wait();
        if (!createFolder) {
          await uploadFileToDb({ fileObj, user });
        } else {
          await uploadFileToFolder({ fileObj, user, folderObj });
        }
      }
      console.log("File successfully added to blockchain");
    } catch (error) {
      console.log("Error adding file");
    }

    setLoaderState(false);
  }
  return (
    <>
      {createFolder && (
        <input
          placeholder="Folder Name"
          value={folderName}
          onChange={(event) => setFolderName(event.target.value)}
        />
      )}
      <button onClick={() => setCreateFolder((oldState) => !oldState)}>
        {!createFolder ? "Create Folder" : "Cancel Folder"}
      </button>
      <button onClick={handleFileUpload}>Upload</button>
    </>
  );
}
