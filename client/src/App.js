import React, { useEffect, Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import * as actions  from './store/actions/index';
import Wrapper       from './components/Wrapper/Wrapper'
import Home          from './components/Pages/Home/Home'
import Profile       from './components/Pages/Profile/Profile'
import Auth          from './components/Pages/Auth/Auth'
import { Route, Switch, withRouter} from 'react-router-dom'

const App = props => {
  const { fetchedUser} = props
  const fetchData = async () => {
    
    props.onFetchUser()
    console.log('user = ' + fetchedUser)
  }
  
  useEffect(()=> {
    if ( !fetchedUser){
      fetchData()
      console.log('payload = ' + fetchedUser)
    }
  }, [fetchedUser])
  
  let routes = (
    <Switch>
      <Route path="/authentication"       component={Auth} />
      <Route path="/home"                 component={Home} />   
      <Route path="/"                     component={Home} />                
    </Switch>
  )

  if (props.fetchedUser) {
    routes = (
      <Switch>
        <Route path="/authentication"       render={props => <Auth {...props} />} />
        <Route path="/home"                 component={Home} />         
        <Route path="/profile"              component={Profile} />
        <Route path="/"                     component={Home} />             
      </Switch>
    )
  }

  return (
    <Wrapper><Suspense fallback={<p>Loading...</p>}>{routes}</Suspense></Wrapper>
  );
}

const mapStateToProps = state => {
  return {
    fetchedUser       : state.auth.payload,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchUser           : () => dispatch(actions.fetchUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
