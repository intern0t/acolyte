import React, { Component } from "react";
import "./styles/acolyte.min.css";
import Sidebar from "./components/Sidebar";
import Notes from "./components/Notes";
import Note from "./components/Note";
import { NotesProvider } from "./contexts/NotesContext";

class App extends Component {
    render() {
        return (
            <div className="app">
                <NotesProvider>
                    <Sidebar />
                    <Notes />
                    <Note />
                </NotesProvider>
            </div>
        );
    }
}

export default App;
