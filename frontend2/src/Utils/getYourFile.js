import { ethers } from "ethers";
import { Address } from "./ContractAddress";
import { createClient } from "./createClient";
import PrivateABI from "../Utils/PrivateABI.json";
import { startDecryption } from "../encFunctions";
import { decryptKeyIV } from "./getPublicKey";

export async function getYourFile(cid, publicKey) {
  const client = createClient();
  const res = await client.get(cid);
  console.log(res);
  const files = await res.files();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    Address.privateupload[0],
    PrivateABI.abi,
    signer
  );
  const accounts = await provider.listAccounts();

  const array = await contract.getusercid(accounts[0]);
  console.log(array);
  // var key, iv;
  // array.forEach((fileObj) => {
  //   if (fileObj.CID === cid) {
  //     console.log(fileObj);

  //     key = fileObj.key;
  //     iv = fileObj.iv;
  //   }
  // });
  for (let fileObj of array) {
    if (fileObj.CID === cid) {
      console.log(fileObj);
      var { key, iv } = await decryptKeyIV(fileObj.key, fileObj.iv);
      iv = iv.split(",");
      // console.log(`Type of IV: ${typeof iv}`);
      // console.log(`Decrypted Key and IV \n ${key} \n ${iv}`);
      // key = fileObj.key;
      // iv = fileObj.iv;
    }
  }
  try {
    const buffer = Buffer.from(iv, "hex");
    const inv = new Uint8Array(buffer);
    console.log(inv);

    await startDecryption(files[0], key, inv);
  } catch (error) {
    console.log(error);
  }
}

export async function getProtectedFile(cid) {
  console.log("New Download function");
  const client = createClient();
  const res = await client.get(cid);
  console.log(res);
  const files = await res.files();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    Address.privateupload[0],
    PrivateABI.abi,
    signer
  );
  const accounts = await provider.listAccounts();

  const array = await contract.getsharedwithuser(accounts[0]);
  console.log(array);
  var key, iv;
  array.forEach((fileObj) => {
    if (fileObj.CID === cid) {
      console.log(fileObj);
      key = fileObj.key;
      iv = fileObj.iv;
    }
  });
  try {
    const buffer = Buffer.from(iv, "hex");
    const inv = new Uint8Array(buffer);
    console.log(inv);

    await startDecryption(files[0], key, inv);
  } catch (error) {
    console.log(error);
  }
}
