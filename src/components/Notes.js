import React, { Component } from "react";
import Icon from "./Icon";

class Notes extends Component {
    state = {
        categories: [
            {
                id: 1,
                title: "Spring 2018"
            },
            {
                id: 2,
                title: "Fall 2019"
            },
            {
                id: 3,
                title: "Spring 2019"
            }
        ],
        subjects: [
            {
                sid: 1,
                cid: 3,
                title: "Computer Science - Data Structures & Algorithms"
            },
            {
                sid: 2,
                cid: 1,
                title: "Applied Statistics for Engineers"
            },
            {
                sid: 3,
                cid: 3,
                title: "English Literature & Composition"
            },
            {
                sid: 4,
                cid: 1,
                title: "Economics - Study on China's Economy"
            },
            {
                sid: 5,
                cid: 1,
                title: "ART"
            }
        ]
    };
    render() {
        return (
            <div className="notes-bar">
                <div className="subject-handler">
                    <a href="/">
                        <Icon icon="fas fa-folder-plus" /> Add New
                    </a>
                </div>
                <div className="subject">
                    {this.state.categories && this.state.categories.length > 0
                        ? this.state.categories.map(category => {
                              return (
                                  <SubjectEntry
                                      subjects={this.state.subjects.filter(
                                          subject => subject.cid === category.id
                                      )}
                                      category={category.title}
                                  />
                              );
                          })
                        : null}
                </div>
            </div>
        );
    }
}

class SubjectEntry extends Component {
    state = {
        isVisible: false,
        category: null,
        subjects: []
    };

    componentDidMount() {
        const { subjects, category } = this.props;
        this.setState(prevState => ({
            ...prevState,
            subjects,
            category
        }));
    }

    handleVisbility = () => {
        this.setState(prevState => ({
            ...prevState,
            isVisible: !prevState.isVisible
        }));
    };

    render() {
        return (
            <div className="subject-entry">
                <div
                    className="subject-title"
                    onClick={this.handleVisbility}
                    title={this.state.category}
                >
                    <Icon
                        icon={`far fa-${
                            this.state.isVisible ? "minus" : "plus"
                        }-square`}
                    />
                    {`${this.state.category} (${this.state.subjects.length})`}
                </div>
                <div
                    className="subject-notes"
                    style={{ display: this.state.isVisible ? "flex" : "none" }}
                >
                    {this.state.subjects && this.state.subjects.length > 0
                        ? this.state.subjects.map(subject => {
                              return (
                                  <li>
                                      <Icon icon="far fa-folder-open" />
                                      {subject.title}
                                  </li>
                              );
                          })
                        : null}
                </div>
            </div>
        );
    }
}

export default Notes;
