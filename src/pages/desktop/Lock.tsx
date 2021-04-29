import { useHistory } from "react-router";
import { useDispatch, useSelector } from "../../hooks/Store";
import { setCurrentUserID } from "../../store/reducers/Users";

import Button from "../../components/UI/Button";

import classes from "./Lock.module.scss";
import Avatar from "../../components/UI/Avatar";
import Typography from "../../components/UI/Typography";

export default function Lock() {
  const users = useSelector((store) => store.users.elements);
  const currentUserID = useSelector((store) => store.users.currentUserID);
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <main className={classes["root"]} onMouseDown={() => {}}>
      <div className={classes["bg"]}></div>
      <section>
        <Avatar
          size="xl"
          alt="Image de profil"
          src={users[currentUserID].profileImage}
        ></Avatar>
        <Button
          variant="filled"
          size="md"
          onClick={() => history.push("/workspace")}
        >
          Se connecter
        </Button>
        <div style={{ position: "fixed", bottom: 0, left: 0, padding: "2rem" }}>
          {Object.keys(users).map((key) => (
            <Button
              startIcon
              variant="blur"
              size="md"
              ripple
              key={key}
              onClick={() => {
                dispatch(setCurrentUserID(key));
              }}
            >
              <Avatar
                alt="Image de profil"
                src={users[key].profileImage}
              ></Avatar>
              <Typography variant="body">{users[key].displayName}</Typography>
            </Button>
          ))}
        </div>
      </section>
    </main>
  );
}
