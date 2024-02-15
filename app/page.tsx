import styles from "./page.module.scss";
import HomePage from "./profile/page";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="home-page">This is homepage!</div>
    </main>
  );
}
