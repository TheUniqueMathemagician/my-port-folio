import { FunctionComponent, memo, useCallback } from "react";
import { useDispatch } from "../hooks/Store";
import { closeApplication, runApplication } from "../store/slices/Applications";
import { Applications } from "../store/slices/Applications/Types";

import Button from "./UI/Input/Button";

import { IoMdClose } from "react-icons/io";
import { MdSend } from "react-icons/md";

import classes from "./MenuBar.module.scss";
import MenuBarTimeDate from "./MenuBarTimeDate";

const Close = memo(IoMdClose);
const Send = memo(MdSend);

interface IProps {
  pid: string;
}

const MenuBar: FunctionComponent<IProps> = (props) => {
  const { pid } = props;

  const dispatch = useDispatch();

  const handleContactClick = useCallback(() => {
    dispatch(runApplication({ aid: Applications.Contact, args: {} }));
  }, [dispatch]);
  const handleCloseClick = useCallback(() => {
    dispatch(closeApplication({ pid }));
  }, [dispatch, pid]);

  const rootClasses = [classes["root"]];

  return (
    <div className={rootClasses.join(" ")}>
      <Button focusable startIcon onClick={handleCloseClick}>
        <Close></Close>
        <span>Fermer</span>
      </Button>
      <Button focusable startIcon color="primary" onClick={handleContactClick}>
        <Send></Send>
        <span>Contacter</span>
      </Button>
    </div>
  );
};

export default MenuBar;
