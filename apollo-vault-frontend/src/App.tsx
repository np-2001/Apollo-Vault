import React, { useState, useEffect } from 'react';
import WebcamCapture from './components/webcam';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import detectEthereumProvider from '@metamask/detect-provider';
import './App.css';

// import express from 'express';
// import cors from 'cors';
// const app = express();

// app.use(cors()); 

// app.listen(5000, () => {
//   console.log('Server is running on port 5000');
// });

class CamApp extends React.Component {
  render() {
    return (
      <div>
        <div className='head'>
          <h2>live Face Recognition</h2>
        </div>
        <WebcamCapture />
      </div>
    );
  }
}

let injectedProvider = false;

if (typeof window.ethereum !== 'undefined') {
  injectedProvider = true;
  console.log(window.ethereum);
}

const isMetaMask = injectedProvider ? window.ethereum.isMetaMask : false;

function App() {
  const [count, setCount] = useState(0);
  const [hasProvider, setHasProvider] = useState<boolean | null>(null)
  const initialState = { accounts: [] };
  const [wallet, setWallet] = useState(initialState);

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      console.log(provider);
      setHasProvider(Boolean(provider)); // transform provider to true or false
    };

    getProvider();
  }, []);

  const updateWallet = async (accounts: any) => {
    setWallet({ accounts });
  };

  const handleConnect = async () => {
    let accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    updateWallet(accounts);
  };

  return (
    <>
    <div>
        <div className='head'>
          <h2>live Face Recognition</h2>
        </div>
        <WebcamCapture />
      </div>
      <div className='App'>
        <h2>Injected Provider {injectedProvider ? 'DOES' : 'DOES NOT'} Exist</h2>
        {hasProvider && (
          <button onClick={handleConnect}>Connect MetaMask</button>
        )}
        {wallet.accounts.length > 0 && (
          <div>Wallet Accounts: {wallet.accounts[0]}</div>
        )}
      </div>
      <div>
        <a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank' rel='noreferrer'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount(count + 1)}>
          count is {count}
        </button>
        <p>Edit <code>src/App.tsx</code> and save to test HMR</p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
      
    </>
  );
}

export { App, CamApp }; 