import React from "react";
import Weather from "./Weather";

import Header from "./Header";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <div>
        <Header />
        <div>
          <Switch>
            <Route exact path="/" component={Weather} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
