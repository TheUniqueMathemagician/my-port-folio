import { useCallback, FormEvent, useState, useEffect } from "react";
import { useHistory } from "react-router";
import User from "../../data/classes/User";
import { useUsers } from "../../data/Users";

import styles from "./Lock.module.scss";

export default function Lock() {
  const [selectedUser] = useState<number>(0);

  const { users, setUsers, setUser } = useUsers();
  const history = useHistory();

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const userID = ([e][0].nativeEvent as any).submitter?.dataset?.user;
      if (userID) {
        setUser(userID);
        history.push("/workspace");
      }
    },
    [setUser, history]
  );

  useEffect(() => {
    setUsers((state) => [...state, new User("Invité", "")]);
  }, [setUsers]);

  return (
    <main className={styles["lock"]}>
      <section>
        <form action="#" method="post" onSubmit={handleSubmit}>
          <input
            type="submit"
            value="Se connecter"
            data-user={users[selectedUser]?.id ?? ""}
          />
        </form>
      </section>
    </main>
  );
}
