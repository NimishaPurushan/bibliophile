import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app'
import { Session } from 'next-auth';


const App = ({ 
  Component, 
  pageProps: {session, ...pageProps },
}: AppProps & {session: Session}) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
