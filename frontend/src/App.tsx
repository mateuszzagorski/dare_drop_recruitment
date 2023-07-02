import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import StreamerSubmissionForm from "./components/StreamerSubmissionForm/StreamerSubmissionForm";
import StreamerList from "./components/StreamerList/StreamerList";
import StreamerRecord from "./components/StreamerRecord/StreamerRecord";
import styles from "./App.module.css";
import { useState } from "react";

const CombinedComponents = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setFormSubmitted(true);
  };

  return (
    <>
      <StreamerSubmissionForm onSubmit={handleFormSubmit} />
      <StreamerList formSubmitted={formSubmitted} />
    </>
  );
};

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <Link to="/" className={styles.navLink}>
                Streamer List
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" Component={CombinedComponents} />
          <Route path="/streamer/:streamerId" Component={StreamerRecord} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
