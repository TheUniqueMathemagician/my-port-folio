import classes from "./index.module.scss";

import { useDispatch, useSelector } from "../../../hooks/Store";
import { runApplication } from "../../../store/slices/Applications";
import { FunctionComponent, memo, useCallback, useState } from "react";

import { MdMail, MdPhone } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";

import Button from "../../UI/Input/Button";
import Paper from "../../UI/Paper";
import Typography from "../../UI/Typography";
import Text from "../../UI/Input/Text";
import TextArea from "../../UI/Input/TextArea";
import Time from "./Elements/Time";
import { EColorScheme } from "../../../types/EColorScheme";
import { Applications } from "../../../store/slices/Applications/Types";

const Sharp = memo(IoLocationSharp);
const Mail = memo(MdMail);
const Phone = memo(MdPhone);

interface IProps {}

const Contact: FunctionComponent<IProps> = () => {
  const dispatch = useDispatch();

  const contrast = useSelector(
    (store) => store.theme.colorScheme === EColorScheme.contrast
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [resendDate, setResendDate] = useState<Date>(
    new Date(parseInt(localStorage.getItem("contact-resend-date") ?? "0"))
  );

  const handleMapsClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      dispatch(runApplication({ aid: Applications.Maps, args: {} }));
    },
    [dispatch]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (loading) return;

      setLoading(true);

      const headers = new Headers();
      const data = new FormData(e.target as HTMLFormElement);
      const body = JSON.stringify(Object.fromEntries(data.entries()));

      headers.append("Content-Type", "application/json");

      try {
        const response = await fetch("/api/contact", {
          method: "post",
          headers,
          body
        });
        if (response.status === 200 || response.status === 429) {
          const text = await response.text();
          localStorage.setItem("contact-resend-date", text);
          setResendDate(new Date(parseInt(text)));
        }
      } catch (_) {
      } finally {
        setLoading(false);
      }
    },
    [loading]
  );

  const rootClasses = [classes["root"]];

  return (
    <div className={rootClasses.join(" ")}>
      <div className={classes["container"]}>
        <Typography variant="h4">Me contacter</Typography>
        <Paper outlined={contrast} spaced blur background="paper">
          <div className={classes["grid"]}>
            <Typography variant="body" noSelect>
              Email
            </Typography>
            <Button
              align="start"
              focusable
              outlined
              size="md"
              startIcon
              to="mailto: tamburrini.yannick@gmail.com"
              variant="filled"
            >
              <Mail></Mail>
              <Typography variant="body" noWrap>
                tamburrini.yannick@gmail.com
              </Typography>
            </Button>
            <Typography variant="body" noSelect>
              Téléphone
            </Typography>
            <Button
              align="start"
              focusable
              outlined
              size="md"
              startIcon
              to="tel:+32 498 62 77 16"
              variant="filled"
            >
              <Phone></Phone>
              <Typography variant="body" noWrap>
                +32 498 62 77 16
              </Typography>
            </Button>
            <Typography variant="body" noSelect>
              Adresse
            </Typography>
            <Button
              align="start"
              focusable
              onClick={handleMapsClick}
              outlined
              size="md"
              startIcon
              to="https://www.google.com/maps/place/Avenue+des+Lanciers+45,+4900+Spa/@50.4888358,5.8542398,17z/data=!3m1!4b1!4m5!3m4!1s0x47c0617fcf8a2513:0xe0e509238ab82a8e!8m2!3d50.4888324!4d5.8564285"
              variant="filled"
            >
              <Sharp></Sharp>
              <Typography variant="body" noWrap>
                Avenue des Lanciers 45, 4900 Spa, Liège Belgique
              </Typography>
            </Button>
          </div>
        </Paper>
        <Typography variant="h4">M'envoyer un message</Typography>
        <Paper outlined={contrast} spaced blur background="paper">
          <form action="" onSubmit={handleSubmit}>
            <Text
              disabled={loading}
              fullWidth
              label="Nom*"
              name="lastname"
              required
            ></Text>
            <Text
              disabled={loading}
              fullWidth
              label="Prénom*"
              name="firstname"
              required
            ></Text>
            <Text
              disabled={loading}
              fullWidth
              label="Organisation*"
              name="org"
              required
            ></Text>
            <Text
              disabled={loading}
              fullWidth
              label="Email*"
              name="email"
              required
              type="email"
            ></Text>
            <Text
              disabled={loading}
              fullWidth
              label="Téléphone"
              name="tel"
              type="tel"
            ></Text>
            <TextArea
              disabled={loading}
              className={classes["text-area"]}
              fullWidth
              label="Message*"
              name="msg"
              required
              vertical
            ></TextArea>
            <Button
              disabled={loading || resendDate.getTime() > 0}
              ripple
              focusable
              color="primary"
              outlined
              size="md"
              variant="filled"
              loading={loading}
            >
              {resendDate.getTime() > 0 ? (
                <Time
                  date={resendDate}
                  onAvailable={() => setResendDate(new Date(0))}
                ></Time>
              ) : (
                "Envoyer"
              )}
            </Button>
            <Typography variant="body">( * champs requis )</Typography>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default memo(Contact);
