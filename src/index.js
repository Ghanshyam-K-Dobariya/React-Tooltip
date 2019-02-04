import React from "react";
import ReactDOM from "react-dom";
import Tooltip from "./Core/Tooltip";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <h2>Reusable Tooltip</h2>

      <div className="dummy">
        Tooltip with top position will be displayed @ bottom, if there is no
        enough space @ top. Same applies with case of Tooltip @ bottom. Check
        tooltip after component 2 & component 4
      </div>
      <div className="dummy">Component 1</div>
      <div className="dummy">Component 2</div>

      <div className="container">
        <Tooltip
          position="top"
          align="left"
          content="This is top tooltip and should be displayed @ bottom, if no enough space @ top"
        >
          <button>Top Left</button>
        </Tooltip>
      </div>

      <div className="container">
        <Tooltip
          position="top"
          align="right"
          content="This is top tooltip and should be displayed @ bottom if no enough space @ top"
        >
          <button>Top Right</button>
        </Tooltip>
      </div>

      <div className="container">
        <Tooltip
          position="top"
          align="center"
          content="This is top tooltip and should be displayed @ bottom if no enough space @ top"
        >
          <button>Top Center</button>
        </Tooltip>
      </div>

      <div className="dummy">Component 3</div>
      <div className="dummy">Component 4</div>

      <div className="container">
        <Tooltip
          position="bottom"
          align="left"
          content="This is top tooltip and should be displayed @ bottom, if no enough space @ top"
        >
          <button>Bottom Left</button>
        </Tooltip>
      </div>

      <div className="container">
        <Tooltip
          position="bottom"
          align="right"
          content="This is top tooltip and should be displayed @ bottom, if no enough space @ top"
        >
          <button>Bottom Right</button>
        </Tooltip>
      </div>

      <div className="container">
        <Tooltip
          position="bottom"
          align="center"
          content="This is top tooltip and should be displayed @ bottom, if no enough space @ top"
        >
          <button>Bottom Center</button>
        </Tooltip>
      </div>

      <div className="dummy">Component 5</div>
      <div className="dummy">Component 6</div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
