import { GetServerSideProps } from 'next';
import Head from 'next/head'
import prisma from '../../prisma/prisma';
import Layout from '../../components/Layout';

export default function Post({post}:any ) {
    if (!post) {
        return <div>Post not found</div>
    }
    const { title, content, author } = post;
    return (    
      <Layout>
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            <h1>{title}</h1>
            <p>{content}</p>
            <p>By {author.name}</p>
        </div>
      </Layout>
    )
}

export const getServerSideProps:GetServerSideProps = async ({ params}: any) => {
    const post = await prisma.post.findUnique({
      where: {
        id: String(params?.id),
      },
      include: {
        author: {
          select: { name: true },
        },
      },
    })|| {};
    console.log("back end");
    console.log(post);
    // const data = await prisma.post.findMany();
    // console.log(data);
    // let resp = await prisma.post.findUniqueOrThrow({ where: { id: String(params?.id) }});
    // console.log(resp);
    return {
      props: {post},
    };
  };