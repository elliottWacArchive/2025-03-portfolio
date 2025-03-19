import Link from "next/link";
import styles from "@/style/404.module.css";

export default function NotFound() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404 - Page Not Found</h1>
            <p className={styles.description}>
                Oops! La page que vous recherchez n'existe pas.
            </p>
            <Link className={styles.homeLink} href="/">
                Retour à l'accueil
            </Link>
        </div>
    );
}
