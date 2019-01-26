import React, { Component } from "react";

const NotesContext = React.createContext();

export class NotesProvider extends Component {
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
        ],
        activeSubjectID: 0,
        activeCategoryID: 0,
        visibility: {
            notesTab: true
        }
    };

    setActiveSubject = sid => {
        this.setState(prevState => ({
            ...prevState,
            activeSubjectID: sid
        }));
    };

    setActiveCategory = cid => {
        this.setState(prevState => ({
            ...prevState,
            activeCategoryID: cid === this.state.activeCategoryID ? 0 : cid
        }));
    };

    toggleNotesTabVisibility = (e) => {
        e.preventDefault();
        this.setState(prevState => ({
            ...prevState,
            visibility: {
                ...prevState.visibility,
                notesTab: !prevState.visibility.notesTab
            }
        }));
    };

    render() {
        const { children } = this.props;
        return (
            <NotesContext.Provider
                value={{
                    categories: this.state.categories,
                    subjects: this.state.subjects,
                    activeCategoryID: this.state.activeCategoryID,
                    activeSubjectID: this.state.activeSubjectID,
                    setActiveSubject: this.setActiveSubject,
                    setActiveCategory: this.setActiveCategory,
                    visibility: this.state.visibility,
                    toggleNotesTabVisibility: this.toggleNotesTabVisibility
                }}
            >
                {children}
            </NotesContext.Provider>
        );
    }
}

export const NotesConsumer = NotesContext.Consumer;
