import React from "react";
import Events from "./components/Events";
import API from "./components/API";
import Platforms from "./components/Platforms";
import Games from "./components/Games";
import GameDetail from "./components/GameDetail";
import BBCode from "./components/BBCode";
import ChainUpdate from "./components/ChainUpdate"
import { Route, Switch } from 'react-router-dom';


export default function App() {
  return (
      <Switch>
        <Route exact path="/" component={Games} />
        <Route path="/events" component={Events} />
        <Route path="/api" component={API} />
        <Route path="/platforms" component={Platforms} />
        <Route path="/games" exact component={Games} />
        <Route path="/games/:id" exact component={GameDetail} />
        <Route path="/bbcode" exact component={BBCode} />
        <Route path="/chainupdate" exact component={ChainUpdate} />
      </Switch>
  );
}
