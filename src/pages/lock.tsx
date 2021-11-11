import {motion} from "framer-motion";
import {useRouter} from "next/dist/client/router";
import {useEffect} from "react";
import {useDispatch, useSelector} from "../hooks/Store";
import Avatar from "../shared/ui/Avatar";
import Button from "../shared/ui/input/Button";
import Typography from "../shared/ui/Typography";
import {setCurrentUserID} from "../store/slices/Users";
import classes from "../styles/pages/Lock.module.scss";

export default function Lock() {
  const history = useRouter();
  const dispatch = useDispatch();

  const users = useSelector((store) => store.users.elements);
  const user = useSelector((store) => store.users.elements[store.users.currentUserID]);

  useEffect(() => {
    for (const [key] of Object.entries(users)) {
      dispatch(setCurrentUserID(key));
      break;
    }
  }, [users, dispatch]);

  return (
    <motion.main
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{duration: 0.3}}
      className={classes["root"]}
    >
      <div className={classes["bg"]}></div>
      <section>
        <Avatar
          size="xl"
          alt="Image de profil"
          src={user?.profileImageURL}
        ></Avatar>
        <Button
          ripple
          variant="blur"
          focusable
          size="md"
          to="/workspace"
        >
          Se connecter
        </Button>
        <div className={classes["users"]}>
          {Object.keys(users).map((key) => (
            <Button
              startIcon
              variant="blur"
              size="md"
              focusable
              ripple
              key={key}
              onClick={() => {
                dispatch(setCurrentUserID(key));
              }}
            >
              <Avatar
                alt="Image de profil"
                src={users[key].profileImageURL}
              ></Avatar>
              <Typography variant="body">{users[key].displayName}</Typography>
            </Button>
          ))}
        </div>
      </section>
    </motion.main>
  );
}
