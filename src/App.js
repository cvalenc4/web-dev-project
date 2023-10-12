import './App.css';
import ProductListing from './Components/ProductListing/ProductListing';
import * as Env from "./environments";
import Parse from "parse";

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function App() {
  return (
    <div className="App">
      <ProductListing />
    </div>
  );
}

export default App;
