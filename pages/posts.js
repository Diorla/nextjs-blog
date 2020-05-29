//@ts-check
import { getSortedPostsData } from "../lib/posts";
import Layout from "../components/Layout";
import Date from "../components/Date";
import Link from "next/link";
// @ts-ignore
import styles from "./../styles/mypage.module.css";

export default ({ allPostsData }) => (
  <Layout title="Posts">
  <div className={styles.center}>
      <h2>Blog</h2>
      <ul>
        {allPostsData.map(({ id, date, title }) => (
          <li key={id}>
            <Link href={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
            <br />
            <Date dateString={date}/>
          </li>
        ))}
      </ul>
    </div>
  </Layout>
);

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
