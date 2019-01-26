import React, { Component } from "react";
import { NotesConsumer } from "../contexts/NotesContext";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
import Remarkable from "remarkable";
import RemarkableReactRenderer from "remarkable-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/styles/hljs";
import CodeMirror from "react-codemirror";
require("codemirror/mode/gfm/gfm");

const md = new Remarkable();
md.renderer = new RemarkableReactRenderer({
    components: {
        pre: ({ content, params: language }) => (
            <SyntaxHighlighter language={language}>{content}</SyntaxHighlighter>
        )
    }
});

export default class Note extends Component {
    state = {
        note: {
            title: "Untitled",
            content: ""
        }
    };

    onNoteChange = note => {
        this.setState(prevState => ({
            ...prevState,
            note: {
                ...prevState.note,
                content: note
            }
        }));
    };

    render() {
        return (
            <NotesConsumer>
                {({
                    categories,
                    subjects,
                    activeCategoryID,
                    activeSubjectID
                }) => {
                    let subjectDetails = subjects.filter(
                        subject => subject.sid === activeSubjectID
                    );
                    let padOptions = {
                        lineNumbers: true,
                        mode: "gfm",
                        scrollBarStyle: null
                    };
                    return (
                        <div className="note">
                            {subjectDetails && subjectDetails.length > 0
                                ? subjectDetails[0].title
                                : "Unknown"}
                            <ScrollSync>
                                <div className="note-wrapper">
                                    <ScrollSyncPane>
                                        <div className="note-wrapper-raw">
                                            <CodeMirror
                                                value={this.state.note.content}
                                                onChange={this.onNoteChange}
                                                options={padOptions}
                                            />
                                        </div>
                                    </ScrollSyncPane>
                                    <ScrollSyncPane>
                                        <div className="note-wrapper-rendered">
                                            <div className="markdown-body">
                                                {md.render(
                                                    this.state.note.content
                                                )}
                                            </div>
                                        </div>
                                    </ScrollSyncPane>
                                </div>
                            </ScrollSync>
                        </div>
                    );
                }}
            </NotesConsumer>
        );
    }
}
