import styles from "./ScreenFrame.module.scss";

const ScreenFrame: React.FunctionComponent = ({ children }) => {
  return <div className={styles["screen-frame"]}>{children}</div>;
};

export default ScreenFrame;
