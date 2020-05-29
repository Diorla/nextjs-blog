//@ts-check
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/Date"

export default function Post({ postData }) {
  return (
    <Layout title={postData.title}>
      {postData.title}
      <br />
      <Date dateString={postData.date}/>
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    // true=> return a stale page, false= return 404 if page is not found
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
