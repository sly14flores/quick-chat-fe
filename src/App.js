import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import User from "./pages/user";
import Chats from "./pages/chats";

import { io } from "socket.io-client"

function App() {

  const socket = io.connect("localhost:5000");  

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <User socket={socket} />
        </Route>
        <Route path="/chats">
          <Chats socket={socket} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
