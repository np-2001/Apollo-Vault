import NavBar from './Navbar'
import './Home.css'
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import detectEthereumProvider from '@metamask/detect-provider'
import ApolloVaultABI from './abis/apollo-vault.json';
//import { ethers } from 'ethers';
let injectedProvider = false

const contractAddress = "0xb8C825e2D81583ddA938Fca7816Ab8F88e7c24c2";
//const provider = new ethers.providers.Web3Provider(window.ethereum)
//await provider.send('eth_requestAccounts', [])
//const signer = await provider.getSigner()
//const apolloVaultContract = new ethers.Contract(contractAddress, ApolloVaultABI, signer);


function Homepage() {

  const [count, setCount] = useState(0)
  const [hasProvider, setHasProvider] = useState<boolean | null>(null)
  const initialState = { accounts: [] }               /* New */
  const [wallet, setWallet] = useState(initialState)  /* New */
  const [facialRecognitionHash, setFacialRecognitionHash] = useState('');

  const handleRegisterUser = async () => {
    try {
      const signer = await window.ethereum.request({ method: 'eth_requestAccounts' });
      //const contractWithSigner = apolloVaultContract.connect(signer[0]);

      // Call the registerUser function
      //const transaction = await contractWithSigner.registerUser(facialRecognitionHash);
      //await transaction.wait();

      return true;
      // Handle success or provide user feedback
      console.log('User registered successfully!');
    } catch (error) {
      // Handle errors
      console.error('Error registering user:');
    }
  };  

  const handleGetUserAddress = async () => {
    try {
      // Call the getUserAddress function
      //const address = await apolloVaultContract.getUserAddress(facialRecognitionHash);

      // Update the state with the retrieved user address
      //return address;
    } catch (error) {
      // Handle errors
      console.error('Error getting user address:');
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