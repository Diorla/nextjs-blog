//@ts-check
import Layout from "../components/layout";
import Link from "next/link";
// @ts-ignore
import styles from "./../styles/mypage.module.css";

export default function Home() {
  return (
    <Layout title="Dynamic routes">
      <div className={styles.center}>
        <h1>Welcome to my blogs</h1>
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
