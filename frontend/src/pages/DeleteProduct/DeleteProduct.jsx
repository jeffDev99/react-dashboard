import React from "react";
import { useDeleteProduct } from "../../services/product";
import toast, { Toaster } from "react-hot-toast";

export default function DeleteProduct({ setShowModal, productInfo }) {
  const { id } = productInfo;
  const { mutate } = useDeleteProduct(id);
  const DeleteHandler = () => {
    const data = {
      ids: [id],
    };
    mutate(
      { data },
      {
        onSuccess: (newData) => {
          toast.success("محصول با موفقیت حذف شد", { duration: 2000 });
          setTimeout(() => setShowModal(false), 2500);
        },
        onError: (newData) => {
          console.log(newData);
        },
      }
    );
  };
  return (
    <>
      <img src="/images/Close.svg" className="block mb-16 m-auto" alt="" />
      <h3 className="text-center font-500 text-xl text-[#282828]">آیا از حذف این محصول مطمئنید؟</h3>
      <div className="flex font-400 gap-5 mt-10">
        <button className="p-3 rounded-lg w-full bg-red text-white" onClick={DeleteHandler}>
          حذف
        </button>
        <button
          className="p-3 rounded-lg w-full bg-[#DFDFDF] "
          onClick={() => {
            setShowModal(false);
          }}
        >
          انصراف
        </button>
      </div>
      <Toaster />
    </>
  );
}
