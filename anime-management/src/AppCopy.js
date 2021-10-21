import ReactDOM from "react-dom";
import React, { Component } from "react";

import Tabs from "./Tabs";
import Panel from "./Panel";

import "./App.css";
import TabContent from "./components/tabcontent/Index";

class App extends Component {
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
        <TabContent />
      </div>
    );
  }
}

export default App;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>mANIMEnt CSS Only Tabs</h1>
        <div className="tab-wrap">
          <input type="radio" name="tabs" id="tab1" checked />
          <div className="tab-label-content" id="tab1-content">
            <label for="tab1">TOP WATCH</label>
            <div className="tab-content">Coming soon!</div>
          </div>

          <input type="radio" name="tabs" id="tab2" />
          <div className="tab-label-content" id="tab2-content">
            <label for="tab2">ON-GOING</label>
            <div className="tab-content">
              You have no on-going anime series. Click add to list now!
            </div>
          </div>

          <input type="radio" name="tabs" id="tab3" />
          <div className="tab-label-content" id="tab3-content">
            <label for="tab3">ON HOLD</label>
            <div className="tab-content">
              You have no on hold series to watch!
            </div>
          </div>

          <input type="radio" name="tabs" id="tab4" />
          <div className="tab-label-content" id="tab4-content">
            <label for="tab4">COMPLETED</label>
            <div className="tab-content">It feels lonely here.</div>
          </div>

          <div className="slide"></div>
        </div>
      </header>
    </div>
  );
}

export default App;*/
