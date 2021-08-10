import "./App.css";

import { Route, BrowserRouter as Router } from "react-router-dom";

import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./components/user/LoginScreen";
import ProductDetails from "./components/product/ProductDetails";
import ProtectedRoute from "./components/route/ProtectedRoute";
import RegisterScreen from "./components/user/RegisterScreen";
import UpdatePasswordScreen from "./components/user/UpdatePasswordScreen";
import UpdateProfileScreen from "./components/user/UpdateProfileScreen";
import UserProfileScreen from "./components/user/UserProfileScreen";
import { loadUser } from "./actions/authActions";
import store from "./store";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Route path="/" component={HomeScreen} exact />
          <Route path="/search/:keyword" component={HomeScreen} />
          <Route path="/product/:id" component={ProductDetails} exact />

          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <ProtectedRoute path="/me" component={UserProfileScreen} exact />
          <ProtectedRoute
            path="/me/update"
            component={UpdateProfileScreen}
            exact
          />
          <ProtectedRoute
            path="/password/update"
            component={UpdatePasswordScreen}
            exact
          />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
