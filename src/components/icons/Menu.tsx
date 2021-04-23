import { makeStyles, Theme } from "@material-ui/core";
import { FunctionComponent } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fill: "none",
    stroke: "#ffffff",
    strokeLinecap: "round",
    strokeMiterlimit: 10,
    strokeWidth: "0.93px"
  }
}));

interface IProps {
  style?: React.CSSProperties;
}

const Menu: FunctionComponent<IProps> = (props) => {
  const { ...others } = props;
  const classes = useStyles();
  return (
    <svg
      {...others}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 15.87 15.87"
    >
      <rect
        className={classes.root}
        x="9.4"
        y="9.4"
        width="6"
        height="6"
        transform="translate(24.8 24.8) rotate(180)"
      />
      <rect
        className={classes.root}
        x="0.47"
        y="9.4"
        width="6"
        height="6"
        transform="translate(6.93 24.8) rotate(180)"
      />
      <rect
        className={classes.root}
        x="9.4"
        y="0.47"
        width="6"
        height="6"
        transform="translate(24.8 6.93) rotate(180)"
      />
      <rect
        className={classes.root}
        x="0.47"
        y="0.47"
        width="6"
        height="6"
        transform="translate(6.93 6.93) rotate(180)"
      />
    </svg>
  );
};

export default Menu;
