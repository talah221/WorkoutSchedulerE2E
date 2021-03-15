import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './cmps/Footer';
import { Navbar } from './cmps/Navbar';
import { About } from './pages/About';
import { Clubs } from './pages/Clubs';
import { ControlPanel } from './pages/ControlPanel';
import { Homepage } from './pages/Homepage';
import Profile from './pages/Profile';
import Schedule from './pages/Schedule';
function App() {

  return (
    <div className="App">
      <Router >
        <Navbar/>
        <Switch>
          <Route  path="/profile" component={Profile} />
          <Route path="/schedule" component={Schedule} />
          <Route path="/clubs" component={Clubs} />
          <Route path="/about" component={About} />
          {/* <Route path="/classes" component={MyClasses} /> */}
          <Route path="/create" component={ControlPanel} />
          <Route path="/" component={Homepage} />
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
