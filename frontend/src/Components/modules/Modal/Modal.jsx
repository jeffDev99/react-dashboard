import React from "react";

export default function Modal({ children, title , showModal , setShowModal }) {
  return (
    <div className={`fixed left-0 right-0 top-0 bottom-0 bg-[#3333337D] backdrop-blur-md w-screen h-screen  ${showModal ? "block" : "hidden"}`}>
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-30 p-8 w-[460px]">
        <h3 className="text-center font-500 text-xl text-[#282828]">{title}</h3>
        {children}
      </div>
    </div>
  );
}
