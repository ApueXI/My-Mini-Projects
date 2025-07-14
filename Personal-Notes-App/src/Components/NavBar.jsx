import { Link } from "react-router-dom";
import styles from "../CSS/NavBar.module.css";

export default function NavBar() {
    return (
        <div className={styles.navBar}>
            <h1 className={styles.title}>My Personal Notes App</h1>
            <Link to="/" className={styles.navBarlink}>
                Home
            </Link>
            <Link to="/notes" className={styles.navBarlink}>
                View Notes
            </Link>
        </div>
    );
}

// [ Home ]   [ View Notes ]   [ Add Note ]
