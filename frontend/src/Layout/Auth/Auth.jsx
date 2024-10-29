import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "/images/logo.png"
import styles from "./Auth.module.css"

export default function Auth() {
  return (
    <div className={styles.authWrapper}>
      <div className={styles.authBox}>
        <figure>
          <img src={Logo} className={styles.authLogo} alt="" />
        </figure>
        <div className={styles.formWrapper}><Outlet/></div>
      </div>
    </div>
  );
}
