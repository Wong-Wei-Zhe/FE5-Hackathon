import ReactDOM from "react-dom";
import React, { Component } from "react";

import Tabs from "./Tabs";
import Panel from "./Panel";

import "./tabcontent.css";

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
    const { data, array, userId } = this.state;
    return (
      <div className="main-container">
        <div style={{ marginLeft: "33px" }}>
          <h1>mANIMEnt Tabs</h1>
        </div>
        <hr />
        <br />
        <Tabs>
          <Panel title="TOP WATCH">
            <div>Site under construction...</div>
            {/*{data.map((event) => {
              return (
                <>
                  <div key={event.id}>
                    <h3>
                      <label>Name : </label>
                      {event.name}
                    </h3>
                  </div>
                  <label>Email: </label>
                  <span>{event.email}</span>
                  <br />
                  <label>Phone: </label>
                  <span>{event.phone}</span>
                  <br />
                </>
              );
            })}*/}
          </Panel>
          <Panel title="ON-GOING">
            <div>
              Please select an ANIME series to have this section filled!
            </div>
          </Panel>
          <Panel title="ON HOLD">
            <div>There's nothing holding you here :P</div>
          </Panel>
          <Panel title="COMPLETED">
            <div>You have not completed any series yet!</div>
          </Panel>
        </Tabs>
      </div>
    );
  }
}

export default TabContent;

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
