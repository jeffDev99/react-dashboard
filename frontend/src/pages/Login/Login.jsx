import React from "react";
import formLogo from "/images/form-logo.svg";
import { useForm } from "react-hook-form";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../services/auth";
import toast, { Toaster } from "react-hot-toast";
import { setCookies } from "../../utils/config";
export default function Login() {
  const { mutate } = useLogin();
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
    },
  });
  return (
    <div>
      <img src={formLogo} alt="formLogo" srcSet={formLogo} className="block m-auto" />
      <p className="font-vazirmatn text-center font-400 text-2xl mt-4 text-light-black">فرم ورود</p>
      <form
        className={styles.form}
        onSubmit={handleSubmit(async (data) => {
          const { username, password } = data;
          mutate(
            { username, password },
            {
              onSuccess: (data) => {
                console.log(data);
                setCookies(data.data.token);
                toast.success("ورود شما با موفقیت انجام شد. تا لحظات دیگر به داشبورد منتقل میشوید", { duration: 3000 });
                setTimeout(() => {
                  navigate("/dashboard");
                }, 3000);
              },
              onError: (err) => {
                console.log(err);
                toast.error("نام کاربری یا رمز عبو اشتباه است");
                setValue("username", "");
                setValue("password", "");
              },
            }
          );
        })}
      >
        <input type="text" {...register("username", { required: "نام کاربری الزامی است" })} id="username" placeholder="نام کاربری" />
        <p>{errors.username?.message}</p>
        <input type="password" {...register("password", { required: "رمز عبور الزامی است" })} id="password" placeholder="رمز عبور" />
        <p>{errors.password?.message}</p>
        <input type="submit" value="ورود" />
        <Link to={"/register"} className=" mt-4 text-blue">
          ایجاد حساب کاربری
        </Link>
      </form>
      <Toaster />
    </div>
  );
}
