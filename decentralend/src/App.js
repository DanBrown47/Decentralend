import React, { Component } from 'react'
import {
  Route,
  HashRouter,
  NavLink,
} from "react-router-dom";
import Web3 from 'web3';
import './App.css';
import { ELECTION_MANAGER_ABI, ELECTION_MANAGER_ADDRESS } from './config.js'
import Home from './Home';
import CreateCircle from './CreateCircle';

class App extends Component {
  componentDidMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    //const electionManager = new web3.eth.Contract(ELECTION_MANAGER_ABI, ELECTION_MANAGER_ADDRESS)
    const electionManager = null
    this.setState({ electionManager })
    //const numElections = await electionManager.methods.getNumElections().call()
    const numElections = [] 
    this.setState({ numElections })
  }

  constructor(props) {
    super(props)
    this.state = { account: '' }
  }

  render() {
    return (
      <HashRouter>
        <div>
          <h1>Decentralend</h1>
          <ul className="header">
            <li><NavLink to="/home">Home</NavLink></li>
            <li><NavLink to="/create-circle">Create Circle</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/home" render={props =>
                <Home numElections={this.state.numElections} {...props} />
              }
            />
            <Route exact path="/create-circle" render={props =>
                <CreateCircle electionManager={this.state.electionManager} account={this.state.account} {...props} />
              }
            />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;