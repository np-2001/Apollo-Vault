import NavBar from './Navbar'
import './Home.css'

function Homepage() {
    return (
    <>
        <div className='App'>
            <NavBar/>
            <h1 id='title'>Welcome to the Apollo Vault</h1>
            <button id="Start" type="button">Click here to start</button>

        </div>
    </>
    )
}

export default Homepage