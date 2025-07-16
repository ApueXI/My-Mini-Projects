import { data, Link } from "react-router-dom";
import styles from "../CSS/NotesList.module.css";
import AddNotes from "../Components/AddNotes";
import { useEffect, useState } from "react";
import React from "react";
import PageNotFOund from "../Components/PageNotFound";

export default function NotesList() {
    const [isAddNote, setIsAddNote] = useState(false);
    const [dataList, setDataList] = useState(() => {
        const storedNotes = localStorage.getItem("notes");
        return storedNotes ? JSON.parse(storedNotes) : [];
    });

    const handleShowNote = () => setIsAddNote(true);
    const handleHideNote = () => setIsAddNote(false);

    const handleDataForm = (formData) => {
        setDataList((prevData) => [...prevData, formData]);
        setIsAddNote(false);
    };

    const removeNotes = (noteID) => {
        setDataList((prevDataList) =>
            prevDataList.filter((notes) => notes.idData !== noteID)
        );
    };

    useEffect(() => {
        const storedNotes = localStorage.getItem("notes");
        if (storedNotes) setDataList(JSON.parse(storedNotes));
    }, []);

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(dataList));
        console.log(`Save Data:${dataList}`);
    }, [dataList]);

    const hasData = (
        <ul className={styles.notesContainer}>
            {dataList.map((data, index) => {
                return (
                    <React.Fragment key={data.idData}>
                        <Link
                            style={{ textDecoration: "none" }}
                            to={`/individual/${data.idData}`}
                            state={{ data }}
                        >
                            <h4 style={{ display: "inline" }}>{`${index + 1} ${
                                data.titleData
                            }`}</h4>
                        </Link>
                        <button
                            style={{ marginLeft: "10px" }}
                            onClick={() => {
                                removeNotes(data.idData);
                            }}
                        >
                            X
                        </button>
                        <br />
                        <br />
                    </React.Fragment>
                );
            })}
        </ul>
    );

    return (
        <div className={styles.body}>
            <div className={styles.titleBG}>
                <h1 className={styles.title}>Notes List</h1>
            </div>
            <div className={styles.container}>
                <div className={styles.notesBG}>
                    {dataList.length ? hasData : <PageNotFOund />}

                    <div
                        className={styles.addNewNotes}
                        onClick={handleShowNote}
                    >
                        Add New Notes
                    </div>
                    <Link to="/" className={styles.backBtn}>
                        Back to Home
                    </Link>
                </div>
            </div>

            {/*  */}
            {isAddNote && (
                <div className={styles.addNotes}>
                    <AddNotes
                        onSubmit={handleDataForm}
                        onCancel={handleHideNote}
                        data={dataList}
                    ></AddNotes>
                </div>
            )}
        </div>
    );
}

// [ Home ]   [ View Notes ]   [ Add Note ]

// ┌────────────────────────────────────┐
// │           📒 All Notes             │
// │                                    │
// │  ▸ Shopping List                   │  ← Link to /notes/1
// │  ▸ Project Ideas                   │  ← Link to /notes/2
// │  ▸ Books to Read                   │  ← Link to /notes/3
// │                                    │
// │   [ Add New Note ]  [ ⬅ Back ]    │
// └────────────────────────────────────┘

// ┌────────────────────────────────────┐
// │           📝 Note Details          │
// │                                    │
// │  📌 Title: Shopping List           │
// │                                    │
// │  • Milk                            │
// │  • Bread                           │
// │  • Eggs                            │
// │                                    │
// │  [ ⬅ Back to All Notes ]           │
// └────────────────────────────────────┘

// ┌────────────────────────────────────┐
// │           ➕ Add New Note           │
// │                                    │
// │  Title:  [___________]             │
// │                                    │
// │  Content:                          │
// │  [_______________________]         │
// │  [_______________________]         │
// │  [_______________________]         │
// │                                    │
// │  [ Save Note ]   [ ⬅ Cancel ]      │
// └────────────────────────────────────┘

// ┌────────────────────────────────────┐
// │         🚫 Page Not Found          │
// │                                    │
// │  [ ⬅ Go Back to Home ]             │
// └────────────────────────────────────┘
