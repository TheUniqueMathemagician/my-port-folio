import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "../../hooks/Store";
import { setWorkspaceBackgroundURL } from "../../store/reducers/Theme";

interface IProps {}

const Settings: FunctionComponent<IProps> = () => {
  const dispatch = useDispatch();
  const bg = useSelector((store) => store.theme.workspaceBackgroundURL);

  return (
    <div>
      <button
        onClick={() =>
          dispatch(
            setWorkspaceBackgroundURL(
              "https://images.unsplash.com/photo-1618080621010-74e7832a27a4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            )
          )
        }
      >
        Theme 1
      </button>
      <button
        onClick={() =>
          dispatch(
            setWorkspaceBackgroundURL(
              "https://images.unsplash.com/photo-1617764188354-9bf4806be0aa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2001&q=80"
            )
          )
        }
      >
        Theme 2
      </button>
      <div>Theme : {bg}</div>
    </div>
  );
};

export default Settings;
