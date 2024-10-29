import React from "react";
export default function Alert({ children, showAlert }) {
  return (
    <div className={`fixed left-0 right-0 top-0 bottom-0 bg-[#3333337D] backdrop-blur-md w-screen h-screen  ${showAlert ? "block" : "hidden"}`}>
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-30 p-11 w-[460px]">
        {children}
      </div>
    </div>
  );
}
