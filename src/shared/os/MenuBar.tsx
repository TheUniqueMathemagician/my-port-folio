import {FC, memo, useCallback} from "react";
import {IoMdClose} from "react-icons/io";
import {MdSend} from "react-icons/md";
import {useDispatch} from "../../hooks/Store";
import {closeApplication, runApplication} from "../../store/slices/Applications";
import {Applications} from "../../store/slices/Applications/Types";
import Button from "../ui/input/Button";
import classes from "./MenuBar.module.scss";


const Close = memo(IoMdClose);
const Send = memo(MdSend);

interface Props {
  pid: string;
}

const MenuBar: FC<Props> = (props) => {
  const {pid} = props;

  const dispatch = useDispatch();

  const handleContactClick = useCallback(() => {
    dispatch(runApplication({aid: Applications.Contact, args: {}}));
  }, [dispatch]);
  const handleCloseClick = useCallback(() => {
    dispatch(closeApplication({pid}));
  }, [dispatch, pid]);

  const rootClasses = [classes["root"]];

  return <div className={rootClasses.join(" ")}>
    <Button focusable startIcon onClick={handleCloseClick}>
      <Close></Close>
      <span>Fermer</span>
    </Button>
    <Button focusable startIcon color="primary" onClick={handleContactClick}>
      <Send></Send>
      <span>Contacter</span>
    </Button>
  </div>;
};

export default MenuBar;
