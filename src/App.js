import React from 'react';
import './App.scss';
import {Route, Switch} from 'react-router';
import UserList from './Components/FecthData/UserList';
import UserDetails from './Components/FecthData/UserDetails';

function App() {
  return (
    <>
    <header className='Container mt-3 pl-2'>
        My App
      </header>
      <Switch>
        <Route exact path='/' component={UserList} />
        <Route path='/userDetails/:phoneNum' component={UserDetails} />
      </Switch>
      <footer className='Footer mt-3' >
        Copyright
      </footer>
    </>
  );
}

export default App;
