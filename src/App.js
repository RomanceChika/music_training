import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import NoteFromInterval from "./contents/NoteFromInterval/NoteFromInterval";
import ChordFromDegree from "./contents/ChordFromDegree/ChordFromDegree";
import IntervalFromSheet from "./contents/IntervalFromSheet/IntervalFromSheet";
import "./App.css";
import { SoundProvider } from "./contexts/SoundContext";
import { AudioProvider } from "./contexts/AudioContext";
import SoundToggleButton from "./components/SoundToggleButton/SoundToggleButton";

function App() {
  return (
    <SoundProvider>
      <AudioProvider>
        <Router>
          <div className="app">
            <nav className="nav">
              <ul className="nav-list">
                <li className="nav-item">
                  <NavLink to="/note-from-interval" activeClassName="active">
                    Note From Interval
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/chord-from-degree" activeClassName="active">
                    Chord From Degree
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/interval-from-sheet" activeClassName="active">
                    Interval From Sheet
                  </NavLink>
                </li>
              </ul>
            </nav>

            <div className="content">
              <SoundToggleButton />
              <Routes>
                <Route
                  path="/note-from-interval"
                  element={<NoteFromInterval />}
                />
                <Route
                  path="/chord-from-degree"
                  element={<ChordFromDegree />}
                />

                <Route
                  path="/interval-from-sheet"
                  element={<IntervalFromSheet />}
                />
                <Route path="/" element={<NoteFromInterval />} />
              </Routes>
            </div>
          </div>
        </Router>
      </AudioProvider>
    </SoundProvider>
  );
}

export default App;
