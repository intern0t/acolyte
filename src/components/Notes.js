import React, { Component } from "react";
import Icon from "./Icon";
import uuidv4 from "uuid/v4";
import { NotesConsumer } from "../contexts/NotesContext";

class Notes extends Component {
    render() {
        return (
            <NotesConsumer>
                {({
                    categories,
                    subjects,
                    activeCategoryID,
                    setActiveSubject,
                    setActiveCategory,
                    visibility
                }) => {
                    return (
                        <div
                            className="notes-bar"
                            style={{
                                display: visibility.notesTab ? "block" : "none"
                            }}
                        >
                            <div className="subject-handler">
                                <a href="/">
                                    <Icon icon="fas fa-folder-plus" /> New
                                    Divider
                                </a>
                                <a href="/">
                                    <Icon icon="fas fa-folder-plus" /> New
                                    Category
                                </a>
                            </div>
                            <div className="subject">
                                {categories && categories.length > 0
                                    ? categories.map(category => {
                                          let filteredSubjects = subjects.filter(
                                              subject =>
                                                  subject.cid === category.id
                                          );
                                          return (
                                              <SubjectEntry
                                                  key={uuidv4()}
                                                  category={category}
                                                  subjects={filteredSubjects}
                                                  activeCategoryID={
                                                      activeCategoryID
                                                  }
                                                  setActiveCategory={
                                                      setActiveCategory
                                                  }
                                                  setActiveSubject={
                                                      setActiveSubject
                                                  }
                                              />
                                          );
                                      })
                                    : null}
                            </div>
                        </div>
                    );
                }}
            </NotesConsumer>
        );
    }
}

const SubjectEntry = ({
    category,
    subjects,
    activeCategoryID,
    setActiveCategory,
    setActiveSubject
}) => {
    return (
        <div className="subject-entry">
            <div
                className="subject-title"
                onClick={() => setActiveCategory(category.id)}
                title={category.title}
            >
                <Icon
                    icon={`far fa-${
                        activeCategoryID === category.id ? "minus" : "plus"
                    }-square`}
                />
                {`${category.title} (${subjects.length})`}
            </div>
            <div
                className="subject-notes"
                style={{
                    display: activeCategoryID === category.id ? "flex" : "none"
                }}
            >
                {subjects && subjects.length > 0
                    ? subjects.map(subject => {
                          return (
                              <li
                                  key={uuidv4()}
                                  onClick={() => setActiveSubject(subject.sid)}
                                  title={subject.title}
                              >
                                  <Icon icon="far fa-folder-open" />
                                  {subject.title}
                              </li>
                          );
                      })
                    : null}
            </div>
        </div>
    );
};

export default Notes;
