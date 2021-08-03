import "./App.css";

import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import HomeScreen from "./components/HomeScreen";

function App() {
  return (
    <div className="App">
      <Header />
      <HomeScreen />
      <Footer />
    </div>
  );
}

export default App;
