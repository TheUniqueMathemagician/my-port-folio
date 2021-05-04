import classes from "./Contact.module.scss";

import { FunctionComponent } from "react";
import { MdMail, MdPhone } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import Button from "../UI/Button";
import Paper from "../UI/Paper";
import Typography from "../UI/Typography";
import { useDispatch, useSelector } from "../../hooks/Store";
import { runApplication } from "../../store/reducers/Instances";

interface IProps {}

const Contact: FunctionComponent<IProps> = () => {
  const dispatch = useDispatch();
  const application = useSelector(
    (store) =>
      store.applications[
        Object.keys(store.applications).find(
          (key) => store.applications[key].displayName === "Maps"
        ) ?? ""
      ]
  );
  return (
    <div className={classes["root"]}>
      <Typography variant="h4">Me contacter</Typography>
      <Paper spaced outlined>
        <div className={classes["grid"]}>
          <Typography noSelect variant="body" className={classes["heading"]}>
            Email
          </Typography>
          <Button
            align="start"
            size="md"
            variant="blur"
            outlined
            focusable
            startIcon
            to="mailto: tamburrini.yannick@gmail.com"
          >
            <MdMail></MdMail>
            <span>tamburrini.yannick@gmail.com</span>
          </Button>
          <Typography noSelect variant="body" className={classes["heading"]}>
            Téléphone
          </Typography>
          <Button
            align="start"
            size="md"
            focusable
            variant="blur"
            outlined
            startIcon
            to="tel:+32 498 62 77 16"
          >
            <MdPhone></MdPhone>
            <span>+32 498 62 77 16</span>
          </Button>
          <Typography noSelect variant="body" className={classes["heading"]}>
            Adresse
          </Typography>
          <Button
            align="start"
            size="md"
            focusable
            variant="blur"
            outlined
            startIcon
            onClick={(e) => {
              e.preventDefault();
              if (application) {
                dispatch(runApplication({ application, args: {} }));
              }
            }}
            to="https://www.google.com/maps/place/Avenue+des+Lanciers+45,+4900+Spa/@50.4888358,5.8542398,17z/data=!3m1!4b1!4m5!3m4!1s0x47c0617fcf8a2513:0xe0e509238ab82a8e!8m2!3d50.4888324!4d5.8564285"
          >
            <IoLocationSharp></IoLocationSharp>
            <span>Avenue des Lanciers 45, 4900 Spa, Liège Belgique</span>
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Contact;
