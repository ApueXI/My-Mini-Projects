import { Link } from "react-router-dom";
import styles from "../CSS/Home.module.css";

export default function Home() {
    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <h1 className={styles.title}>Welcome To NotesApp</h1>
                <div className={styles.navBar}>
                    <div className={styles.navBarBG}>
                        <h2 className={styles.navBarTitle}>Nav Bar</h2>
                        <Link to="/notes" className={styles.navBarlink}>
                            Notes List
                        </Link>
                        <Link to="/add" className={styles.navBarlink}>
                            Add Notes
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
