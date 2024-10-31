import React, { useEffect, useState, startTransition } from "react";
// icons
import { SearchNormal1 } from "iconsax-react";
// my import
import { useGetMainProduct } from "../../../services/product";
// styles
import styles from "./TopBar.module.css";
import { useNavigate } from "react-router-dom";
import { deleteCookie } from "../../../utils/config";

export default function TopBar() {
  const [search, setSearch] = useState("");
  const { data, refetch } = useGetMainProduct(search);
  const [isShowLogout, setIsShowLogout] = useState(false);
  const navigate = useNavigate();
  const logOutHandler = () => {
    deleteCookie("Token");
    navigate("/");
  };

  useEffect(() => {
    const controller = new AbortController();
    if (!search) return;
    refetch();
    return () => {
      controller.abort();
    };
  }, [search]);

  return (
    <div className="flex relative justify-between bg-white px-[28px] py-3 rounded-2xl border border-semi-dark-gray ">
      <div className="flex items-center w-[80%]">
        <SearchNormal1 size="24" className="me-3" />
        <input type="search" placeholder="جستجو کالا" value={search} onChange={(e) => setSearch(e.target.value.toLowerCase())} className="outline-none w-full" />
      </div>
      <figure
        className="flex border-r px-4 relative rounded-l-md transition transition-all duration-300 hover:cursor-pointer hover:bg-semi-dark-gray "
        onClick={() => setIsShowLogout((prev) => !prev)}
      >
        <img src="/images/avatar.jpeg" className="w-[46px] h-[46px] rounded-full me-3" alt="" />
        <figcaption className="hidden md:block">
          <p className="font-400 text-base text-dark-[#282828]">میلاد عضمی</p>
          <span className="text-sm">مدیر</span>
        </figcaption>
        {isShowLogout && (
          <div className={styles.logOut}>
            <button onClick={logOutHandler}>خروج</button>
          </div>
        )}
      </figure>
      {!!search && (
        <div className={styles.searchResult}>
          {!data.data.data.length ? (
            <ul>
              <li className="my-4">
                <p>محصولی یافت نشد</p>
              </li>
            </ul>
          ) : (
            <ul>
              {data?.data?.data.map((i) => (
                <li key={i.id} className="my-4">
                  <p>{i.name}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
