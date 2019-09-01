import React, { Component } from 'react'
import {Route,HashRouter as Router} from 'react-router-dom'
import Home from './pages/Home'
import List from './pages/List'
import News from './pages/News'
import Profile from './pages/Profile'
import Layout from './components/Layout'
export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <section>
            <Route path="/" exact render={()=><Layout><Home/></Layout>}/>
            <Route path="/List" render={()=><Layout><List/></Layout>}/>
            <Route path="/News"render={()=><Layout><News/></Layout>}/>
            <Route path="/Profile"render={()=><Layout><Profile/></Layout>}/>
          </section>
        </Router>
      </div>
    )
  }
}
