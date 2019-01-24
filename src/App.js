import React, { Component } from "react";
import "./styles/acolyte.min.css";
import Sidebar from "./components/Sidebar";
import Notes from "./components/Notes";
import Note from "./components/Note";

class App extends Component {
    render() {
        return (
            <div className="app">
                <Sidebar />
                <Notes />
                <Note />
            </div>
        );
    }
}

export default App;
