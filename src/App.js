import './App.css';
import * as Env from "./environments";
import Parse from "parse";
import Components from "./Components/Components.js";
import { SearchProvider } from './SearchContext.js';

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function App() {

  return (
    <SearchProvider>
      <Components />
    </SearchProvider>
  );
};

export default App;
