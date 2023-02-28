import { ethers } from "ethers";
import React from "react";
import { Address } from "../Utils/ContractAddress";
import InputField from "./InputFiled";
import PublicABI from "../Utils/PublicABI.json";
import PrivateABI from "../Utils/PrivateABI.json";
import Modal from "./Modal";
import { useSelector } from "react-redux";

export default function ShareModal({ modalShareToggler }) {
  const [receiverUserId, setReceiverUserId] = React.useState("");
  const { downloadList } = useSelector((state) => state.download);
  const { User } = useSelector((state) => state);
  const { slider } = useSelector((state) => state);

  async function publicShareHandler() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      Address.Publicupload[0],
      PublicABI.abi,
      signer
    );

    for (let obj of downloadList) {
      const res = await contract.sharewithother(receiverUserId, obj.cid);
      console.log(receiverUserId, obj.cid);
      const result = await res.wait();
      console.log(result);
    }
    console.log("Successfully shared.");
  }

  async function privateShareHandler() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      Address.privateupload[0],
      PrivateABI.abi,
      signer
    );
    const res = await contract.getusercid(User?.data?.userMetaMaskId);
    const filesToShare = [];
    for (let obj of downloadList) {
      const filteredRes = res.filter((element) => element.CID === obj.cid);
      filesToShare.push(...filteredRes);
    }

    console.log(filesToShare);
    try {
      for (let obj of filesToShare) {
        const response = await contract.sharewithother(
          receiverUserId,
          obj.CID,
          obj.key,
          obj.iv
        );
        console.log(receiverUserId, obj.CID, obj.key, obj.iv);
        const result = await response.wait();
        console.log(result);
      }
      console.log("File Shared");
    } catch (error) {
      console.log("Error occured while sharing file.", error);
    }
  }

  return (
    <Modal modalVisToggler={modalShareToggler}>
      <h3>Enter user id to share with:</h3>
      <InputField
        type={String}
        name="ReceiverId"
        value={receiverUserId}
        changeHandler={(event) => setReceiverUserId(event.target.value)}
        placeholder="User Id"
      />
      {receiverUserId.length === 42 && receiverUserId.startsWith("0x") && (
        <span
          // onClick={publicShareHandler}
          onClick={
            slider.sliderState === "public"
              ? publicShareHandler
              : privateShareHandler
          }
          className="border-solid border-[2px] border-black px-4 py-2 inline-block w-[70px] cursor-pointer mt-4 rounded-[10px] hover:bg-[rgb(64,107,159)] hover:text-white hover:shadow-sm transition-all"
        >
          Share
        </span>
      )}
    </Modal>
  );
}
