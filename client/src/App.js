import "./App.css";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from "./components/Login";
import Register from "./components/Register";
import ProfilePage from "./components/ProfilePage";

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Register}/>
        <Route path="/login" component={Login}/>
        <Route path="/profile" component={ProfilePage}/>
      </Switch>
    </Router>
  );
}

export default App;
