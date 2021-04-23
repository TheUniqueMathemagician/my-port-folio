import { Avatar, Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "../../hooks/Store";
import { setCurrentUserID } from "../../store/reducers/Users";
import styles from "./Lock.module.scss";

export default function Lock() {
  const users = useSelector((store) => store.users.elements);
  const currentUserID = useSelector((store) => store.users.currentUserID);
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <main className={styles["root"]}>
      <section>
        <Avatar
          className={styles.avatar}
          alt="Image de profil"
          src={users[currentUserID].profileImage}
        ></Avatar>
        <Button
          className={styles.button}
          variant="outlined"
          size="large"
          onClick={() => history.push("/workspace")}
        >
          Se connecter
        </Button>
        <div style={{ position: "fixed", bottom: 0, left: 0, padding: "2rem" }}>
          {Object.keys(users).map((key) => {
            return (
              <Button
                key={key}
                variant="outlined"
                className={styles.button}
                onClick={() => {
                  dispatch(setCurrentUserID(key));
                }}
              >
                <Avatar
                  alt="Image de profil"
                  src={users[key].profileImage}
                ></Avatar>
                <Typography style={{ marginLeft: "1rem" }}>
                  {users[key].displayName}
                </Typography>
              </Button>
            );
          })}
        </div>
      </section>
    </main>
  );
}
