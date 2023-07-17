import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import Link from "next/link";

import styles from "../../styles/user-side-bar.module.css";

export default function UserSideBar() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const decodedToken = jwt_decode(storedToken);
    const userEmail = decodedToken.email;
    setEmail(userEmail);
  }, []);

  return (
    <div className={styles.sideBar}>
      <div className={styles.email}>{email}</div>
      <div className={styles.profile}>
        <Link href="/user/profile">My Account</Link>
      </div>
      <div className={styles.purchase}>
        <Link href="/user/purchase-history">My Purchase</Link>
      </div>
    </div>
  );
}
