import React, { Component } from "react";
import Tabs from "./Tabs";
import Panel from "./Panel";
import "./tabcontent.css";
import TopContent from "../Topcontent";

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
          <Panel title="ON-GOING">
            <div>
              <span style={{ color: "white" }}>
                Please select an ANIME series to have this section filled!
              </span>
            </div>
          </Panel>
          <Panel title="ON HOLD">
            <div>
              <span style={{ color: "white" }}>
                There's nothing holding you here :P
              </span>
            </div>
          </Panel>
          <Panel title="REMOVED">
            <div>
              <span style={{ color: "white" }}>
                You have no remove any items yet!
              </span>
            </div>
          </Panel>
          <Panel title="COMPLETED">
            <div>
              <span style={{ color: "white" }}>
                You have not completed any series yet!
              </span>
            </div>
          </Panel>
        </Tabs>
      </div>
    );
  }
}

export default TabContent;

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
