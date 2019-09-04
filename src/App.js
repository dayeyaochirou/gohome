import React, { Component } from 'react'
import {Route,HashRouter as Router} from 'react-router-dom'
import Home from './pages/Home'
import List from './pages/List'
import News from './pages/News'
import Profile from './pages/Profile'
import Layout from './components/Layout'
import {citySet} from "./store/actionCreator";
import store from "./store";
import CityList from "./pages/CityList";
export default class App extends Component {
  componentDidMount() {
    this.getLocalCity();
  }
  getLocalCity() {
    const myCity = new window.BMap.LocalCity();
    myCity.get((result) => {
      const cityName = result.name;
      store.dispatch(citySet(cityName));
    });
  }
  render() {
    return (
      <div>
        <Router>
          <section>
            <Route path="/" exact render={()=><Layout><Home/></Layout>}/>
            <Route path="/List" render={()=><Layout><List/></Layout>}/>
            <Route path="/News"render={()=><Layout><News/></Layout>}/>
            <Route path="/Profile"render={()=><Layout><Profile/></Layout>}/>
            <Route path="/CityList" component={CityList} />
          </section>
        </Router>
      </div>
    )
  }
}
