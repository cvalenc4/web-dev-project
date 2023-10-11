import './App.css';
import ProductListing from './Components/ProductListing/ProductListing';
import Parse from "parse";

Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
// Remember to inform BOTH the Back4App Application ID AND the JavaScript KEY
Parse.initialize(
  "8s5HtEE4TCs3Eai05y0lHPMlL7kBPP1daPu9pL5i", // This is your Application ID
  "J5IkXss5RKPsBqaM6lzHJxFmgMtbB2NWOqVxHJ58" // This is your Javascript key
);

function App() {
  return (
    <div className="App">
      <ProductListing />
    </div>
  );
}

export default App;
