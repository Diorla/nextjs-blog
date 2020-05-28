//@ts-check
import React from "react";
import Link from "next/link";
import Head from "../components/head";
import Nav from "../components/nav";
import { getSortedPostsData } from "./../lib/post";

export default ({ allPostsData }) => (
  <div>
    <Head title="Pre-rendering" />
    <Nav />
    <section>
      <h2>Blog</h2>
      <ul>
        {allPostsData.map(({ id, date, title }) => (
          <li key={id}>
            {title} <br />
            {id} <br />
            {date}
          </li>
        ))}
      </ul>
    </section>
  </div>
);

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
