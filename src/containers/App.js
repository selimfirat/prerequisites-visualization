import React, { Component } from 'react';
import './App.css';
import TopBar from '../components/TopBar/TopBar'
import ActionBar from '../components/ActionBar/ActionBar'
import Graph from '../components/Graph/Graph'
import Filters from '../components/Filters/Filters'

class App extends Component {
  render() {
    return (
        <div className="app">
            <div className="app-header">
                <TopBar/>
            </div>
            <div className="app-body">
                <div className="app-sidebar">
                    <Filters/>
                </div>
                <div className="app-main">
                    <ActionBar/>
                    <Graph/>
                </div>
            </div>
        </div>
    );
  }
}

export default App;
