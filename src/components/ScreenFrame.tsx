import classes from "./ScreenFrame.module.scss";
import { useSelector } from "../hooks/Store";
import { FunctionComponent } from "react";

const ScreenFrame: FunctionComponent = ({ children }) => {
  const bg = useSelector((store) => store.theme.workspaceBackgroundURL);

  const isMobile = useSelector((store) => store.os.isMobile);

  const rootClasses = [classes["root"]];

  if (isMobile) rootClasses.push(classes["mobile"]);

  return (
    <div
      style={{
        background: `url(${bg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}
      className={rootClasses.join(" ")}
    >
      {children}
    </div>
  );
};

export default ScreenFrame;
