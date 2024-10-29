import React from "react";
import { useForm } from "react-hook-form";
import styles from "./CreateProduct.module.css";
import { useCreateProduct } from "../../services/product";
import toast, { Toaster } from "react-hot-toast";

export default function CreateProduct({ setShowModal }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      quantity: "",
      price: "",
    },
  });
  const { mutate } = useCreateProduct();
  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit((data) => {
        mutate(data, {
          onSuccess: (newData) => {
             setShowModal(false)
          },
          onError: (newData) => {
            console.log(newData);
          },
        });
      })}
    >
      <label htmlFor="name">نام کالا</label>
      <input type="text" {...register("name", { required: "نام کالا الزامی است" })} id="name" placeholder="نام کالا" />
      <p>{errors.name?.message}</p>
      <label htmlFor="quantity">تعداد موجودی</label>
      <input
        type="text"
        {...register("quantity", { required: "تعداد موجودی الزامی است", pattern: { value: /^(0|[1-9][0-9]*)$/, message: "مقدار وارد شده باید عدد مثبت باشد" } })}
        id="quantity"
        placeholder="تعداد موجودی"
      />
      <p>{errors.quantity?.message}</p>
      <label htmlFor="price">قیمت</label>
      <input type="text" {...register("price", { required: "قیمت الزامی است", pattern: { value: /^(0|[1-9][0-9]*)$/, message: "مقدار وارد شده باید عدد مثبت باشد" } })} id="price" placeholder="قیمت" />
      <p>{errors.price?.message}</p>
      <div className={styles.btns}>
        <input type="submit" value="ایجاد" />
        <input
          type="button"
          value="انصراف"
          onClick={() => {
            setShowModal(false);
            return reset();
          }}
        />
      </div>
    </form>
  );
}
