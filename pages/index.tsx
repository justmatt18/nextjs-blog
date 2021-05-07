import Head from "next/head";
import styles from "../styles/Home.module.scss";

import Link from "next/link";

const BLOG_URL = "https://smlblog-qc.herokuapp.com";
const { CONTENT_API_KEY } = process.env;

type Post = {
  title: string;
  slug: string;
  featured_image: string;
};

async function getPost() {
  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=title,slug,custom_excerpt,reading_time,feature_image`
  ).then((res) => res.json());

  const posts = res.posts;
  console.log(posts);

  return posts;
}

export const getStaticProps = async ({ params }) => {
  const posts = await getPost();

  return {
    props: { posts },
  };
};

const Home: React.FC<{ posts: Post[] }> = (props) => {
  const { posts } = props;

  return (
    <div className={styles.container}>
      <Head>
        <title>Daily SML Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Daily dose of <a href="/">SML</a>
        </h1>
        <ul>
          {posts.map((post, index) => {
            return (
              <li key={post.slug}>
                <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                  <a>{post.title}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with 💗 by Marco
        </a>
      </footer>
    </div>
  );
};

export default Home;
