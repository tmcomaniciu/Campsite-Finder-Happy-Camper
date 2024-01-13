import "./App.css";
import Camps from "./Components/Camps";

function App() {
  console.log("inside App");
  return (
    <div className="App">
      <h1>Welcome to Camping</h1>
      <Camps />
    </div>
  );
}

export default App;
