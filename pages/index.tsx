import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import prisma from '../prisma/prisma';
import Layout from '../components/Layout';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { styled } from '@mui/material/styles';
import { signOut, useSession } from 'next-auth/react';
import { findAllPosts, IPostsWithUser, IUserWithPosts } from 'service/post';


export default function Home({feed:props}: {feed:IPostsWithUser[]}) {
  const [expanded, setExpanded] = useState<string | false>(false);
  const { data: session, status } = useSession();
  const [readMore,setReadMore]=useState(false);

  const linkName=readMore?'Read Less << ':'Read More >> '

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  
    const updateLike = async (id:string) => {
      console.log(id);
      await fetch(`/api/post/${id}`, {
        method: 'UPDATE',
      });
    }

    if (status === 'loading') {
      return (
        <Layout>
          <Box sx={{ width: '100%' }}>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </Box>
        </Layout>
      );
    }

    
  return ( 
    <Layout>
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Box>
        
      <ul>
      
        {props.map(({title, content, id, authorId, author}: IPostsWithUser, i) => (
          <div>
          <Accordion expanded={expanded === `panel1`} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0  , fontWeight: 'bold'}}>
            {title} 
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontWeight: 'bold'}}>
          <a className={styles.right} href={`/author/${authorId}`}>{author? author.name :  title}</a>
            
            </Typography>
            <ThumbUpAltIcon sx={{ color: 'text.secondary', fontWeight: 'bold'}} className={styles.right}/>
          </AccordionSummary>
          <AccordionDetails>
          <Typography>
          {content && content.split('\n', 1)[0]}
          <a className={styles.right} href={`p/${id}`}>{linkName}</a>
      {readMore && content}

          {/* <a className={styles.right} onClick={()=>{setReadMore(!readMore)}}>{linkName}</a>
      {readMore && post.content} */}
          </Typography>
        </AccordionDetails>
        </Accordion>
        </div>
        ))}
      </ul>
      </Box>
    </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const feed: IPostsWithUser[] = await findAllPosts()
  return {
    props: {feed},
    revalidate: 10,
  };
};
