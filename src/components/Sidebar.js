import React from "react";
import Icon from "./Icon";
import { NotesConsumer } from "../contexts/NotesContext";

export default function Sidebar() {
    return (
        <NotesConsumer>
            {({ toggleNotesTabVisibility }) => {
                return (
                    <div className="sidebar">
                        <div className="logo">
                            <a href="/">A</a>
                        </div>
                        <ul>
                            <li>
                                <a href="/" title="Create a new note.">
                                    <Icon icon="fas fa-plus" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/"
                                    title="Toggle notes window."
                                    onClick={toggleNotesTabVisibility}
                                >
                                    <Icon icon="far fa-file-alt" />
                                </a>
                            </li>
                            <li>
                                <a href="/" title="Download all your notes.">
                                    <Icon icon="far fa-file-archive" />
                                </a>
                            </li>
                            <li>
                                <a href="/" title="Toggle Light/Dark mode.">
                                    <Icon icon="fas fa-toggle-off" />
                                </a>
                            </li>
                        </ul>
                    </div>
                );
            }}
        </NotesConsumer>
    );
}
