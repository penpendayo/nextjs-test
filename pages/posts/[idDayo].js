import Layout from "../../components/layout";
import Date from "../../components/date";
import Head from "next/head";

import { getAllPostIds, getPostData } from "../../lib/posts";
//静的なファイルの生成
export async function getStaticPaths() {
  const paths = getAllPostIds();
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

//データを使用して静的ページを生成する場合(外部APIのfetch,データベースへのアクセス等)、getStaticPathsで
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.idDayo);
  return {
    props: {
      postData,
    },
  };
}

import utilStyles from "../../styles/utils.module.css";
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
