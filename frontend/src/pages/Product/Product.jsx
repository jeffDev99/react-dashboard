import React, { useEffect, useState } from "react";
import { Edit, Setting3, Trash } from "iconsax-react";
import styles from "./Product.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useGetProducts } from "../../services/product";
import Modal from "../../Components/modules/Modal/Modal";
import CreateProduct from "../CreateProduct/CreateProduct";
import EditProduct from "../EditProduct/EditProduct";
import DeleteProduct from "../DeleteProduct/DeleteProduct";
import Alert from "../../Components/modules/Alert/Alert";
export default function Product() {
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [productInfo, setProductInfo] = useState("");
  const [activePage, setActivePage] = useState(1);
  const { data, refetch } = useGetProducts(5, activePage);

  useEffect(() => {
    refetch();
  }, [activePage, refetch]);
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Setting3 size={30} />
          <p className="ms-2 text-2xl font-400">مدیریت کالا</p>
        </div>
        <button className="bg-blue text-base px-4 py-3 rounded-xl font-400 text-white cursor-pointer" onClick={() => setAddModal(true)}>
          افزودن محصول
        </button>
      </div>
      <div className={styles.table}>
        <div className={styles.tableThead}>
          <div className="py-6 pr-10 ">نام کالا</div>
          <div className="py-6">موجودی</div>
          <div className="py-6">قیمت</div>
          <div className="py-6">شناسه کالا</div>
          <div className="py-6 "></div>
        </div>
        {data.data.data.map((i) => (
          <div className={styles.tableBody} key={i.id}>
            <div className="py-6 pr-10 "> {i.name}</div>
            <div className="py-6">{i.quantity}</div>
            <div className="py-6">{i.price}</div>
            <div className="py-6">{i.id}</div>
            <div className="py-6 ">
              <button
                onClick={() => {
                  setEditModal((prev) => !prev);
                  setProductInfo({ id: i.id, name: i.name, quantity: i.quantity, price: i.price });
                }}
              >
                <Edit size="20" color="#4ADE80" className="hover:drop-shadow" />
              </button>
              <button
                onClick={() => {
                  setDeleteAlert((prev) => !prev);
                  setProductInfo({ id: i.id });
                }}
              >
                <Trash size="20" color="#F43F5E" className="hover:drop-shadow" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-3">
        {(function (rows, i, len) {
          while (++i <= len) {
            const currentIndex = i;
            rows.push(
              <div
                key={i}
                className={`border border-[#8D8D8D80] rounded-full w-[35px] h-[35px] flex items-center justify-center text-[#8D8D8D80] cursor-pointer ${activePage === i ? "bg-blue !text-white" : ""}`}
                onClick={() => setActivePage(currentIndex)}
              >
                {i}
              </div>
            );
          }
          return rows;
        })([], 0, data.data.totalPages)}
      </div>
      <Modal title="ایجاد محصول جدید" showModal={addModal} setShowModal={setAddModal}>
        <CreateProduct showModal={addModal} setShowModal={setAddModal} />
      </Modal>
      <Modal title="ویرایش اطلاعات" showModal={editModal} setShowModal={setEditModal}>
        <EditProduct showModal={editModal} setShowModal={setEditModal} productInfo={productInfo} />
      </Modal>
      <Alert showAlert={deleteAlert} setShowAlert={setDeleteAlert}>
        <DeleteProduct setShowModal={setDeleteAlert} productInfo={productInfo} />
      </Alert>
    </>
  );
}
