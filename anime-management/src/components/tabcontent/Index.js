import React, { Component } from "react";
import Tabs from "./Tabs";
import Panel from "./Panel";
import "./tabcontent.css";
import TopContent from "../Topcontent";
import WatchListComplete from "../WatchList/indexcp";
import WatchListWatching from "../WatchList/indexptwt";
import WatchListPlanToWatch from "../WatchList/indexptw";
import WatchListOnHold from "../WatchList/indexptoh";

class TabContent extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], userId: 4, array: [5, 1, 3, 4, 6] };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            data: result,
          });
          console.log(this.state.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  render() {
    return (
      <div className="main-container">
        <Tabs className="tab_selection">
          <Panel title="TOP WATCH" className="top_content_container">
            <TopContent className="top_contents" />
          </Panel>
          <Panel title="WATCHING">
            {/* <div>
              <span style={{ color: "white" }}>
                Please select an ANIME series to have this section filled!
              </span>
            </div> */}
            <WatchListWatching />
          </Panel>
          <Panel title="PLAN TO WATCH">
            {/* <div>
              <span style={{ color: "white" }}>
                There's nothing holding you here :P
              </span>
            </div> */}
            <WatchListPlanToWatch />
          </Panel>
          <Panel title="COMPLETED">
            {/* <div>
              <span style={{ color: "white" }}>
                You have no remove any items yet!
              </span>
            </div> */}
            <WatchListComplete />
          </Panel>
          <Panel title="ONHOLD">
            {/* <div>
              <span style={{ color: "white" }}>
                You have not completed any series yet!
              </span>
            </div> */}
            <WatchListOnHold />
          </Panel>
        </Tabs>
      </div>
    );
  }
}

export default TabContent;

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
