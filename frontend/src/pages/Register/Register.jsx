import React from "react";
import formLogo from "/images/form-logo.svg";
import { useForm } from "react-hook-form";
import styles from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../../services/auth";
import toast, { Toaster } from "react-hot-toast";
export default function Register() {
  const { mutate } = useRegister();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  return (
    <div>
      <img src={formLogo} alt="formLogo" srcSet={formLogo} className="block m-auto" />
      <p className="font-vazirmatn text-center font-400 text-2xl mt-4 text-light-black">فرم ثبت نام</p>
      <form
        className={styles.form}
        onSubmit={handleSubmit(async (data) => {
          const { username, password } = data;
          mutate(
            { username, password },
            {
              onSuccess: (data) => {
                console.log(data);
                toast.success("شما با موفقیت ثبت نام کردید. تا لحظاتی دیگر به صفحه ورود منتقل میشوید", { duration: 3000 });
                setTimeout(() => {
                  navigate("/login");
                }, 3000);
              },
              onError: (err) => {
                console.log(err);
                toast.error("نام کاربری تکراری است. لطفا با نام کاربری دیگری ثبت نام کنید");
                setValue("username", "");
                setValue("password", "");
                setValue("confirmPassword", "");
              },
            }
          );
        })}
      >
        <input type="text" {...register("username", { required: "نام کاربری الزامی است" })} id="username" placeholder="نام کاربری" />
        <p>{errors.username?.message}</p>
        <input type="password" {...register("password", { required: "رمز عبور الزامی است" })} id="password" placeholder="رمز عبور" />
        <p>{errors.password?.message}</p>
        <input
          type="password"
          {...register("confirmPassword", {
            required: "تایید رمز عبور الزامی است",
            validate: (val) => {
              if (watch("password") != val) {
                return "رمز وارد شده مطابقت ندارد";
              }
            },
          })}
          id="confirmPassword"
          placeholder="تایید رمز عبور"
        />
        <p>{errors.confirmPassword?.message}</p>
        <input type="submit" value="ثبت نام" />
        <Link to={"/login"} className=" mt-4 text-blue">
          حساب کاربری دارید؟
        </Link>
      </form>
      <Toaster />
    </div>
  );
}
