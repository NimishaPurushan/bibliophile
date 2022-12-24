import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Slide from '@mui/material/Slide';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';


const Navigation: React.FC = () =>{

    const router = useRouter();
    const isActive: (pathname: string) => boolean = (pathname) =>
      router.pathname === pathname;

  const { data: session, status } = useSession();

  let right = null;
  let left = null;
  if (!session) {
    right = (
      <div className={styles.right}>
        <a href='/api/auth/signin' className={styles.link}>Log in</a>
      </div>
    );
    left = (
      <div className={styles.left}>
          <AutoStoriesIcon/>
          <p className={styles.title}>bibliophile</p>
          </div>
    );
  }
  if (session) {
    left = (
      <div className={styles.left}>
         <AutoStoriesIcon/>
         <p className={styles.title}>bibliophile</p>
          <a  href="/" className={styles.link} data-active={isActive('/')}>
            Feed
          </a>
          <a href="/drafts" data-active={isActive('/drafts')} className={styles.link}>My drafts</a>
          <a href="/create" data-active={isActive('/create')} className={styles.link}>New post</a>
      </div>
    );
    right = (
      <div className="right">
        <p>{session?.user?.email}</p>
        <button onClick={() => signOut()}>
          <a href='/'>Log out</a>
        </button>
        <style jsx>{`
          button{
            border: none;
            outline: none;
            background-color: #ff9999;
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }
          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          p {
            display: inline-block;
            font-size: 13px;
            padding-right: 1rem;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }

          button {
            border: none;
          }
        `}</style>
      </div>
    );
  }
    return (
      <div>
        <nav className='navbar'>
        
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}>
          <AppBar position="static" className={styles.container}>
        <Toolbar>
          {left}    
      
          {right}    
          
        
              <AccountCircle  />
          </Toolbar>
          </AppBar>
          </Box>
        </nav>
      </div>
    )
  }
  
  export default Navigation