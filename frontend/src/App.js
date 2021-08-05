import "./App.css";

import { Route, BrowserRouter as Router } from "react-router-dom";

import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./components/user/LoginScreen";
import ProductDetails from "./components/product/ProductDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Route path="/" component={HomeScreen} exact />
          <Route path="/search/:keyword" component={HomeScreen} />
          <Route path="/product/:id" component={ProductDetails} exact />

          <Route path="/login" component={LoginScreen} />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
