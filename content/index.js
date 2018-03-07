import React from "react";
import ReactDOM from "react-dom";
import {Router} from "./components/Router/Router";
import {BugList} from "./components/BugList/BugList";
import {Report} from "./components/Report/Report";

const ROUTER_CONFIG = [
  {
    id: "current_iteration",
    label: "Current Iteration",
    render: () => <BugList id="current_iteration" />,
  },
  {
    id: "report",
    label: "Report",
    render: () => <Report />
  }
];

const App = props => {
  return (<Router routes={ROUTER_CONFIG} defaultRoute="current_iteration" />);
}

ReactDOM.render(<App />, document.getElementById("root"));