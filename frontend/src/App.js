import "./App.css";

import { Route, BrowserRouter as Router } from "react-router-dom";

import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import HomeScreen from "./components/HomeScreen";
import ProductDetails from "./components/product/ProductDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductDetails} exact />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
