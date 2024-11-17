import {
  HashRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import WelcomePage from "./pages/welcomPage/WelcomePage";
import Pictures from "./pages/pictures/Pictures";
import Dialog from "./pages/dialog/Dialog";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage/>}/>
          <Route path="pictures" element={<Pictures/>}/>
          <Route path="pictures/:id" element={<Dialog/>}/>
      </Routes>
      </Router>

    </div>
  );
}

export default App;
