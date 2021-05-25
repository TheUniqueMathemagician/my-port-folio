import {
  FunctionComponent,
  ReactEventHandler,
  SyntheticEvent,
  useRef,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  memo
} from "react";
import { useHistory } from "react-router";
import { useSelector } from "../../hooks/Store";

import classes from "./Boot.module.scss";

const header = ` ██████╗██╗   ██╗ ██████╗ ███████╗
██╔════╝██║   ██║██╔═══██╗██╔════╝
██║     ██║   ██║██║   ██║███████╗
██║     ╚██╗ ██╔╝██║   ██║╚════██║
╚██████╗ ╚████╔╝ ╚██████╔╝███████║
 ╚═════╝  ╚═══╝   ╚═════╝ ╚══════╝
`;

interface IProps {}

enum EState {
  Error,
  Loading,
  Next
}

const Loading: FunctionComponent = () => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const interval = globalThis.setInterval(() => {
      if (index > 2) setIndex(0);
      else setIndex((index) => index + 1);
    }, 150);
    return () => globalThis.clearInterval(interval);
  }, [index]);

  return (
    <p className={classes["loading"]}>
      <span>Chargement</span>
      <span>{["\\", "|", "/", "-"][index]}</span>
    </p>
  );
};

const Boot: FunctionComponent<IProps> = () => {
  const [state, setState] = useState<EState>(EState.Loading);

  const customInputRef = useRef<HTMLTextAreaElement>(null);
  const history = useHistory();

  const currentUserID = useSelector((store) => store.users.currentUserID);

  const handleChange = useCallback(() => {}, []);

  const handleClick = useCallback(() => {
    if (state === EState.Next) history.replace("/lock");
  }, [history, state]);

  const handleSelect: ReactEventHandler<HTMLTextAreaElement> = (
    e: SyntheticEvent<HTMLTextAreaElement, Event>
  ) => {
    const input = e.currentTarget;
    if (input.selectionStart < 1) {
      input.selectionStart = 1;
    }
  };

  const split = useCallback((str: string) => {
    return str.split("").map((letter, i) =>
      letter === "\n" ? (
        <br key={i} />
      ) : (
        <span
          style={{
            animation: `fade 1s ${i / 4}s ease`
          }}
          key={i}
        >
          {letter}
        </span>
      )
    );
  }, []);

  useLayoutEffect(() => {
    if (currentUserID) history.push("/lock");
  }, [currentUserID, history]);

  useEffect(() => {
    const interval = globalThis.setInterval(() => {
      setState(EState.Next);
    }, 999);
    return () => globalThis.clearInterval(interval);
  }, []);

  return (
    <main className={classes["boot"]} onClick={handleClick}>
      <h2 className={classes["monospace"]}>{split(header)}</h2>
      {state === EState.Loading && (
        <article>
          <br />
          <Loading></Loading>
        </article>
      )}
      {state === EState.Error && (
        <article>
          <p>Le plein écran a rencontré un problème...</p>
        </article>
      )}
      {state === EState.Next && (
        <article>
          <br />
          <p>Appuyez sur l'écran pour continuer</p>
          <br />
          <form action="#" method="post" onSubmit={(e) => e.preventDefault()}>
            <label>
              <textarea
                className={classes["custom-input"]}
                spellCheck="false"
                name="input"
                autoFocus
                rows={1}
                onChange={handleChange}
                ref={customInputRef}
                defaultValue={">"}
                onSelect={handleSelect}
                disabled
              ></textarea>
            </label>
          </form>
        </article>
      )}
    </main>
  );
};

export default memo(Boot);
