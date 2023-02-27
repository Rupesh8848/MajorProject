import { ethers } from "ethers";
import React from "react";
import { Address } from "../Utils/ContractAddress";
import InputField from "./InputFiled";
import PublicABI from "../Utils/PublicABI.json";
import Modal from "./Modal";
import { useSelector } from "react-redux";

export default function ShareModal({ modalShareToggler }) {
  const [receiverUserId, setReceiverUserId] = React.useState("");
  const { downloadList } = useSelector((state) => state.download);
  async function shareHandler() {
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
          onClick={shareHandler}
          className="border-solid border-[2px] border-black w-full px-4 py-2 inline-block w-[70px] cursor-pointer mt-4 rounded-[10px] hover:bg-[rgb(64,107,159)] hover:text-white hover:shadow-sm transition-all"
        >
          Share
        </span>
      )}
    </Modal>
  );
}
