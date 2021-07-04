import React, { useEffect, Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import * as actions  from './store/actions/index';
import Wrapper       from './components/Wrapper/Wrapper'
import Home          from './components/Pages/Home/Home'
import Profile       from './components/Pages/Profile/Profile'
import Auth          from './components/Pages/Auth/Auth'
import Connect	     from './components/Pages/Connect/Connect'
import Shop          from './components/Pages/Shop/Shop'
import Cart          from './components/Pages/Cart/Cart'
import Orders        from './components/Pages/Orders/Orders'
import Checkout      from './components/Pages/Checkout/Success'
import { Route, Switch, withRouter} from 'react-router-dom'

const App = props => {
  const { fetchedUser, fetchedUsers} = props
  
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




  const fetchUsers = async () => {
    props.onFetchUsers()
    console.log('users = ' + fetchedUsers)
  }
  
  useEffect(()=> {
    if ( !fetchedUsers){
      fetchUsers()
      console.log('payload = ' + fetchedUsers)
    }
  }, [fetchedUsers])
  let routes = (
    <Switch>
      <Route path="/checkout"             component={Checkout} />
      <Route path="/authentication"       component={Auth} />
      <Route exact path="/authentication/api/v1/users/resetPassword/:token"       
                                          render={props => <Auth {...props} />} />
      <Route path="/home"                 component={Home} />   
      <Route path="/connect"              component={Connect} />
      <Route path="/shop"                 component={Shop} />
      <Route path="/cart"                 component={Cart} />
      <Route path="/"                     component={Home} />                
    </Switch>
  )

  if (props.fetchedUser) {
    routes = (
      <Switch>
        <Route path="/checkout"             component={Checkout} />
        <Route path="/authentication"       render={props => <Auth {...props} />} />
        <Route exact path="/authentication/api/v1/users/resetPassword/:token"       
                                          render={props => <Auth {...props} />} />
        <Route path="/home"                 component={Home} />         
        <Route path="/connect"              component={Connect} />
        <Route path="/profile"              component={Profile} />
        <Route path="/shop"                 component={Shop} />
        <Route path="/cart"                 component={Cart} />
        <Route path="/orders"               component={Orders} />
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
    fetchedUsers      : state.auth.users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchUser           : () => dispatch(actions.fetchUser()),
    onFetchUsers           : () => dispatch(actions.fetchUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
