//@ts-check
import Nav from "./../components/nav";
import Head from "next/head";
// @ts-ignore
import styles from "./../styles/mypage.module.css";

const rand = Math.floor(Math.random() * 10);
export default () => (
  <div>
    <Head>
      <title>Post #{rand}</title>
      <link rel="icon" href="/books.ico" />
    </Head>
    <Nav />
    <div className={styles.text}>Hello</div>
    <img src="kermit.jpg" alt="A frog goes shopping" className={styles.image} />
  </div>
);
