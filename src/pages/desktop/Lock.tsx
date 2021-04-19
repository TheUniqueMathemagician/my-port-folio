import styles from "./Lock.module.scss";

export default function Lock() {
  return (
    <main className={styles["lock"]}>
      <section>
        <form
          action="#"
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input type="submit" value="Se connecter" />
        </form>
      </section>
    </main>
  );
}
