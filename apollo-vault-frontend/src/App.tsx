import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import detectEthereumProvider from '@metamask/detect-provider'
import NavBar from './Navbar'
import './App.css'
let injectedProvider = false

if (typeof window.ethereum !== 'undefined') {
  injectedProvider = true
  console.log(window.ethereum)
}

const isMetaMask = injectedProvider ? window.ethereum.isMetaMask : false


function App() {
  const [count, setCount] = useState(0)
  const [hasProvider, setHasProvider] = useState<boolean | null>(null)
  const initialState = { accounts: [] }               /* New */
  const [wallet, setWallet] = useState(initialState)  /* New */

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      console.log(provider)
      setHasProvider(Boolean(provider)) // transform provider to true or false
    }

    getProvider()
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
      <div className='App'>
        
        <NavBar/>

        <button id="Start" type="button">Start</button>


        

      </div>
    {/*
      <div className="App">

        <h2>Injected Provider { injectedProvider ? 'DOES' : 'DOES NOT'} Exist</h2>
        { hasProvider &&                               
        <button onClick={handleConnect}>Connect MetaMask</button>
        }
        { wallet.accounts.length > 0 &&                
          <div>Wallet Accounts: { wallet.accounts[0] }</div>
        }
      </div>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      
      */}




    </>
  
  )
}

export default App
