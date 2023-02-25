import React from "react";
import { FaPlus } from "react-icons/fa";

export default function SideBar({ setUploadModalVisible }) {
  return (
    <section className="flex flex-col border-r-[1px] pr-[1rem] pt-4 pl-4 ">
      <div
        onClick={() => setUploadModalVisible(true)}
        className=" flex justify-center w-[10rem] gap-1 border-[1px] items-center font-semibold text-[1.2rem] px-[10px] py-[5px] rounded-full  cursor-pointer shadow hover:bg-[rbg(94,95,107)] hover:bg-[rgb(235,235,235)] hover:shadow-lg hover:translate-y-[-2px]"
      >
        <FaPlus />
        Upload
      </div>
    </section>
  );
}
