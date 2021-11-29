import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import User from '../User/User';
import UserDetail from '../UserDetail/UserDetails';
import AddUser from '../AddUser/AddUser';
import Header from '../Header/index';
export default function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/user">
            <User />
          </Route>
          <Route exact path="/detail">
            <UserDetail />
          </Route>
          <Route exact path="/adduser">
            <AddUser />
          </Route>
          <Route exact path="/edituser">
            <AddUser />
          </Route>
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </div>
  );
}
