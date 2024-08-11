"use client";
import { useMutation } from "@blitzjs/rpc";
import { useRouter } from "next/navigation";
import styles from "../../styles/Home.module.css";
import logout from "../mutations/logout";

export function LogoutButton() {
  const router = useRouter();
  const [logoutMutation] = useMutation(logout);
  return (
    <>
      <button
        className={styles.button}
        onClick={async () => {
          await logoutMutation();
          router.refresh();
        }}
      >
        Logout
      </button>
    </>
  );
}
