import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './Login';
import Profile from './Profile';
import SignUp from './SignUp';
import OtherProfile from './OtherProfile';
import ChatBox from './ChatBox';
import Loading from './Loading';


function App() {
  return (
    <>
    {/* <Loading/> */}
      <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/SignUp" component={SignUp} />
        <Route path="/Profile" component={Profile} />
        <Route path="/OtherProfile" component={OtherProfile} />
        <Route path="/ChatBox" component={ChatBox} />
      </Switch>
    </Router>
    </>
  );
}

export default App;
