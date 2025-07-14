import { Link } from "react-router-dom";
import styles from "../CSS/NotesList.module.css";
import AddNotes from "../Components/AddNotes";
import { useEffect, useState } from "react";
import React from "react";

export default function NotesList() {
    const [isAddNote, setIsAddNote] = useState(false);
    const [dataList, setDataList] = useState([]);

    const handleShowNote = () => setIsAddNote(true);
    const handleHideNote = () => setIsAddNote(false);

    const handleDataForm = (formData) => {
        setDataList((prevData) => [...prevData, formData]);
    };

    useEffect(() => {
        setIsAddNote(false);
        console.log(dataList);
    }, [dataList]);

    return (
        <div className={styles.body}>
            <div className={styles.titleBG}>
                <h1 className={styles.title}>Notes List</h1>
            </div>
            <div className={styles.container}>
                <div className={styles.notesBG}>
                    <ul className={styles.notesContainer}>
                        {dataList.map((data, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <Link to={`notes/${index}`}>
                                        {`Title: ${data.titleData}`}
                                        {`Content: ${data.contentData}`}
                                        {`ID: ${data.idData}`}
                                        <br />
                                    </Link>
                                    <br />
                                </React.Fragment>
                            );
                        })}
                    </ul>
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
