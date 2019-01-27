import React, { Component } from "react";
import { NotesConsumer } from "../contexts/NotesContext";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight } from "react-syntax-highlighter/dist/styles/hljs";

// import brace from "brace";
import AceEditor from "react-ace";
import "brace/mode/markdown";
import "brace/theme/github";
import Markdown from "react-markdown-it";

var hljs = require("highlight.js");

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
                    return (
                        <div className="note">
                            {subjectDetails && subjectDetails.length > 0
                                ? subjectDetails[0].title
                                : "Unknown"}

                            <ScrollSync>
                                <div className="note-wrapper">
                                    <ScrollSyncPane group="note">
                                        <div
                                            className="note-wrapper-raw"
                                            style={{ overflow: "auto" }}
                                        >
                                            <AceEditor
                                                onChange={this.onNoteChange}
                                                value={this.state.note.content}
                                                mode="markdown"
                                                theme="github"
                                                width={"100%"}
                                                height={"100%"}
                                                fontSize={14}
                                                showPrintMargin={false}
                                                editorProps={{
                                                    $blockScrolling: true
                                                }}
                                                setOptions={{
                                                    enableBasicAutocompletion: false,
                                                    enableLiveAutocompletion: true,
                                                    enableSnippets: false,
                                                    animatedScroll: true,
                                                    showLineNumbers: true,
                                                    tabSize: 4
                                                }}
                                            />
                                        </div>
                                    </ScrollSyncPane>
                                    <ScrollSyncPane group="note">
                                        <div
                                            className="note-wrapper-rendered"
                                            style={{ overflow: "auto" }}
                                        >
                                            <div className="markdown-body">
                                                <Markdown
                                                    source={
                                                        this.state.note.content
                                                    }
                                                    options={{
                                                        langPrefix: "hljs-",
                                                        typographer: true,
                                                        quotes: "“”‘’",
                                                        container:
                                                            "markdown-body",
                                                        highlight: function(
                                                            str,
                                                            lang
                                                        ) {
                                                            if (
                                                                lang &&
                                                                hljs.getLanguage(
                                                                    lang
                                                                )
                                                            ) {
                                                                try {
                                                                    return hljs.highlight(
                                                                        lang,
                                                                        str
                                                                    ).value;
                                                                } catch (__) {}
                                                            }

                                                            return ""; // use external default escaping
                                                        }
                                                    }}
                                                />
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

class CodeBlock extends React.PureComponent {
    render() {
        const { language, value } = this.props;

        return (
            <SyntaxHighlighter language={language} style={tomorrowNight}>
                {value}
            </SyntaxHighlighter>
        );
    }
}
