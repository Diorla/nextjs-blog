//@ts-check
import Layout from "../components/Layout";
import Link from "next/link";
// @ts-ignore
import styles from "./../styles/mypage.module.css";
import { useState } from "react";

export default function Home() {
  const [api, setApi] = useState({ text: "" });
  fetch("/api/hello")
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      setApi(myJson);
    });
  return (
    <Layout title="API routes">
      <div className={styles.center}>
        <h1>Welcome to my blogs</h1>
        <div>Api fetch: {api.text}</div>
        <div>
          <Link href="/posts">
            <a>Click here</a>
          </Link>{" "}
          to check out my posts
        </div>
      </div>
    </Layout>
  );
}
