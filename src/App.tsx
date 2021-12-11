import React, { useEffect, useState } from 'react';
import { config } from './config';
import { ReactComponent as Logo } from './assets/images/logo-black.svg';
import { connect, WalletConnection } from 'near-api-js';
import './App.css';
import { getFinalBlock, signIn, signOut } from './utils';
import { BlockResult } from 'near-api-js/lib/providers/provider';

function App() {
  const [wallet, setWallet] = useState<WalletConnection | null>(null);
  const [block, setBlock] = useState<BlockResult | null>(null);
  const isSignIn = wallet?.isSignedIn();

  useEffect(() => {
    (async () => {
      try {
        const near = await connect(config);
        setWallet(new WalletConnection(near, null));
        const response = await getFinalBlock(near);
        setBlock(response);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const handleSignIn = () => {
    if (wallet) isSignIn ? signOut(wallet) : signIn(wallet);
  };

  return (
    <div className='App'>
      <Logo className={'app-logo'} />
      {isSignIn ? <pre>{JSON.stringify(block, null, 2)}</pre> : <h1>Login to your account</h1>}
      <button onClick={handleSignIn} className='button-main'>
        {isSignIn ? 'Log out' : 'Log in'}
      </button>
    </div>
  );
}

export default App;
