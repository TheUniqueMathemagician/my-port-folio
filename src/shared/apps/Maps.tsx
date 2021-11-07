import {FC, memo, PropsWithChildren} from "react";
import classes from "./Maps.module.scss";

interface Props {
  pid: string;
}

const Maps: FC<Props> = ({pid}) => <iframe
  className={classes["root"]}
  title={pid + "_location_frame"}
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2538.4363683385245!2d5.854239815953606!3d50.48883579247903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c0617fcf8a2513%3A0xe0e509238ab82a8e!2sAvenue%20des%20Lanciers%2045%2C%204900%20Spa!5e0!3m2!1sfr!2sbe!4v1620066514763!5m2!1sfr!2sbe"
  allowFullScreen
  loading="lazy"
></iframe>;

export default memo<PropsWithChildren<Props>>(Maps);
