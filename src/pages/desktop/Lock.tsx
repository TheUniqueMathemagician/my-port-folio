import {
  Avatar,
  Button,
  makeStyles,
  Theme,
  Typography
} from "@material-ui/core";
import { useHistory } from "react-router";
import { useSelector } from "../../hooks/Store";
import styles from "./Lock.module.scss";

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    width: "16rem",
    height: "16rem"
  },
  button: {
    borderColor: "white",
    color: "white",
    background: "#00000020",
    "&:hover,&:focus": {
      background: "#00000030"
    }
  }
}));

export default function Lock() {
  const users = useSelector((store) => store.users);
  const classes = useStyles();
  const history = useHistory();
  return (
    <main className={styles["lock"]}>
      <section>
        <Avatar
          className={classes.avatar}
          alt="Image de profil"
          src={users[Object.keys(users)[0]].profileImage}
        ></Avatar>
        <Button
          className={classes.button}
          variant="outlined"
          onClick={() => history.push("/workspace")}
        >
          Se connecter
        </Button>
        <div style={{ position: "fixed", bottom: 0, left: 0, padding: "2rem" }}>
          <Button variant="outlined" className={classes.button}>
            <Avatar
              alt="Image de profil"
              src={users[Object.keys(users)[0]].profileImage}
            ></Avatar>
            <Typography style={{ marginLeft: "1rem" }}>
              {users[Object.keys(users)[0]].displayName}
            </Typography>
          </Button>
        </div>
      </section>
    </main>
  );
}
