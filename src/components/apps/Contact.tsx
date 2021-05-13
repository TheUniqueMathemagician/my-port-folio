import classes from "./Contact.module.scss";

import { useDispatch, useSelector } from "../../hooks/Store";
import { runApplication } from "../../store/reducers/Instances";
import { FunctionComponent, memo, useCallback } from "react";

import { MdMail, MdPhone } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";

import Button from "../UI/Input/Button";
import Paper from "../UI/Paper";
import Typography from "../UI/Typography";
import Text from "../UI/Input/Text";
import TextArea from "../UI/Input/TextArea";

const Sharp = memo(IoLocationSharp);
const Mail = memo(MdMail);
const Phone = memo(MdPhone);

interface IProps {}

const Contact: FunctionComponent<IProps> = () => {
  const dispatch = useDispatch();

  const maps = useSelector(
    (store) =>
      store.applications.elements[
        Object.keys(store.applications.elements).find(
          (key) => store.applications.elements[key].displayName === "Maps"
        ) ?? ""
      ]
  );

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const data = new FormData(e.target as HTMLFormElement);

    const body = JSON.stringify(Object.fromEntries(data.entries()));
    fetch("/api/contact", { method: "post", headers, body });
  }, []);

  return (
    <div className={classes["root"]}>
      <Typography variant="h4">Me contacter</Typography>
      <Paper spaced blur background="paper">
        <div className={classes["grid"]}>
          <Typography variant="body">Email</Typography>
          <Button
            align="start"
            size="md"
            variant="filled"
            focusable
            startIcon
            to="mailto: tamburrini.yannick@gmail.com"
          >
            <Mail></Mail>
            <Typography variant="body" noWrap>
              tamburrini.yannick@gmail.com
            </Typography>
          </Button>
          <Typography variant="body">Téléphone</Typography>
          <Button
            align="start"
            size="md"
            focusable
            variant="filled"
            startIcon
            to="tel:+32 498 62 77 16"
          >
            <Phone></Phone>
            <Typography variant="body" noWrap>
              +32 498 62 77 16
            </Typography>
          </Button>
          <Typography variant="body">Adresse</Typography>
          <Button
            align="start"
            size="md"
            focusable
            variant="filled"
            startIcon
            onClick={(e) => {
              e.preventDefault();
              if (maps) {
                dispatch(runApplication({ application: maps, args: {} }));
              }
            }}
            to="https://www.google.com/maps/place/Avenue+des+Lanciers+45,+4900+Spa/@50.4888358,5.8542398,17z/data=!3m1!4b1!4m5!3m4!1s0x47c0617fcf8a2513:0xe0e509238ab82a8e!8m2!3d50.4888324!4d5.8564285"
          >
            <Sharp></Sharp>
            <Typography variant="body" noWrap>
              Avenue des Lanciers 45, 4900 Spa, Liège Belgique
            </Typography>
          </Button>
          {/* TODO: add contact form  */}
        </div>
      </Paper>
      <Typography variant="h4">M'envoyer un message</Typography>
      <Paper spaced blur background="paper">
        <form action="" onSubmit={handleSubmit}>
          <Text fullWidth label="Nom*" name="lastname" required></Text>
          <Text fullWidth label="Prénom*" name="firstname" required></Text>
          <Text fullWidth label="Organisation*" name="org" required></Text>
          <Text
            fullWidth
            label="Email*"
            name="email"
            required
            type="email"
          ></Text>
          <Text fullWidth label="Téléphone" name="tel" type="tel"></Text>
          <TextArea
            className={classes["text-area"]}
            fullWidth
            label="Message*"
            name="msg"
            required
            vertical
          ></TextArea>
          <Button ripple focusable color="primary" outlined>
            Envoyer
          </Button>
          <Typography variant="body">( * champs requis )</Typography>
        </form>
      </Paper>
    </div>
  );
};

export default Contact;
