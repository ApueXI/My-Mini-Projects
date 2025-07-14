import { Link } from "react-router-dom";
import styles from "../CSS/AddNotes.module.css";
import { useRef, useState } from "react";

export default function AddNotes({ onCancel, onSubmit, data }) {
    const [titleData, setTitleData] = useState("");
    const [contentData, setContentData] = useState("");
    const titleText = useRef(null);
    const contentText = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newId = data.length;
        onSubmit({ titleData, contentData, idData: newId });

        setTitleData("");
        setContentData("");
    };

    return (
        <div className={styles.addNotes}>
            <h1 className={styles.addNoteTitle}>From add Notes</h1>

            <form className={styles.form} onSubmit={handleSubmit} action="">
                <div className={styles.containTitle}>
                    <label className={styles.titleLbl} htmlFor="title">
                        Title:{" "}
                    </label>
                    <input
                        className={styles.title}
                        onChange={(e) => {
                            setTitleData(e.target.value);
                        }}
                        type="text"
                        id="title"
                        ref={titleText}
                        required
                    />
                </div>
                <br />
                <label className={styles.contentLbl} htmlFor="content">
                    Content:
                </label>
                <br />

                <textarea
                    onChange={(e) => {
                        setContentData(e.target.value);
                    }}
                    className={styles.content}
                    id="content"
                    ref={contentText}
                    required
                ></textarea>
                <br />
                <div className={styles.containBtn}>
                    <button type="submit">Save Note</button>
                    <div onClick={onCancel} className={styles.cancel}>
                        Cancel
                    </div>
                </div>
            </form>
        </div>
    );
}

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
