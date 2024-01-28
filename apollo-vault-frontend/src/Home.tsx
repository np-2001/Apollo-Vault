import NavBar from './Navbar'
import './Home.css'
import { useState, useEffect } from 'react'
import WebcamCapture from './components/webcam';
import detectEthereumProvider from '@metamask/detect-provider'
import ApolloVaultABI from './abis/apollo-vault.json';
import { ethers } from 'ethers';
let injectedProvider = false

const contractAddress = "0xb8C825e2D81583ddA938Fca7816Ab8F88e7c24c2";

function Homepage() {

  const [count, setCount] = useState(0)
  const [hasProvider, setHasProvider] = useState<boolean | null>(null)
  const initialState = { accounts: [] }               /* New */
  const [wallet, setWallet] = useState(initialState)  /* New */
  const [facialRecognitionHash, setFacialRecognitionHash] = useState('');

  const [error, setError] = useState(false)                /* New */
  const [errorMessage, setErrorMessage] = useState("")

  const handleRegisterAndFetchUser = async () => {
    
    try {
      // Call the getUserAddress function
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner()
      const apolloVaultContract = new ethers.Contract(contractAddress, ApolloVaultABI, signer);

      const registerTransaction = await apolloVaultContract.registerUser(facialRecognitionHash);
      await registerTransaction.wait();

      const address = await apolloVaultContract.getUserAddress(facialRecognitionHash);

      if (address == facialRecognitionHash) {
        return true;
      }

    } catch (error) {
      // Handle errors
      console.error('Error getting user address:', error);
    }
  };

  useEffect(() => {
    const refreshAccounts = (accounts: any) => {                /* New */
      if (accounts.length > 0) {                                /* New */
        updateWallet(accounts)                                  /* New */
      } else {                                                  /* New */
        // if length 0, user is disconnected                    /* New */
        setWallet(initialState)                                 /* New */
      }                                                         /* New */
    } 
    
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      console.log(provider)
      setHasProvider(Boolean(provider)) // transform provider to true or false
      if (provider) {                                           /* New */
        const accounts = await window.ethereum.request(         /* New */
          { method: 'eth_accounts' }                            /* New */
        )                                                       /* New */
        refreshAccounts(accounts)                               /* New */
        window.ethereum.on('accountsChanged', refreshAccounts)  /* New */
      }
    }

    getProvider()
    return () => {                                              /* New */
      window.ethereum?.removeListener('accountsChanged', refreshAccounts)
    } 
  }, [])

  const updateWallet = async (accounts:any) => {     /* New */
  setWallet({ accounts })                          /* New */
  }                                                  /* New */

  const handleConnect = async () => {                /* New */
    let accounts = await window.ethereum.request({   /* New */
      method: "eth_requestAccounts",                 /* New */
    })                                               /* New */
    updateWallet(accounts)                           /* New */
  }  
    return (
    <>
        <div id='App'>
            <NavBar/>
            <h1 id='title'>Welcome to the Apollo Vault</h1>
            <WebcamCapture />
            <button id="Start" type="button">Click here to start</button>

            { hasProvider &&                               
            <button onClick={handleConnect}>Connect MetaMask</button>
            }
            { wallet.accounts.length > 0 &&                
            <div>Wallet Accounts: { wallet.accounts[0] }</div>
            }
        </div>
    </>
    )
}

export default Homepage