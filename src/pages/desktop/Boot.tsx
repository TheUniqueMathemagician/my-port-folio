import {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  ReactEventHandler,
  SyntheticEvent,
  useRef,
  useState,
  useEffect,
  useCallback
} from "react";
import { useHistory } from "react-router";

import styles from "./Boot.module.scss";

const header = ` ██████╗██╗   ██╗ ██████╗ ███████╗
██╔════╝██║   ██║██╔═══██╗██╔════╝
██║     ██║   ██║██║   ██║███████╗
██║     ╚██╗ ██╔╝██║   ██║╚════██║
╚██████╗ ╚████╔╝ ╚██████╔╝███████║
 ╚═════╝  ╚═══╝   ╚═════╝ ╚══════╝
`;

interface IProps {}

interface IState {
  step: number;
}

const Boot: FunctionComponent<IProps> = () => {
  const [state, setState] = useState<IState>({ step: 0 });

  const customInputRef = useRef<HTMLTextAreaElement>(null);
  const history = useHistory();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target;
    if (input.value[input.value.length - 1] === "\n") {
      fullscreen(input.value.substring(1, input.value.length - 1));
      input.form?.reset();
    } else {
      input.style.height = `${input.scrollHeight}px`;
      document.body.scrollTo({
        behavior: "smooth",
        left: 0,
        top: document.body.scrollHeight
      });
    }
    if (input.selectionStart < 1) {
      input.selectionStart = 1;
    }
    input.value = input.value.match(/>.*$/gi)?.[0] ?? ">";
  };

  const handleSelect: ReactEventHandler<HTMLTextAreaElement> = (
    e: SyntheticEvent<HTMLTextAreaElement, Event>
  ) => {
    const input = e.currentTarget;
    if (input.selectionStart < 1) {
      input.selectionStart = 1;
    }
  };

  const fullscreen = async (response: string) => {
    switch (response.toUpperCase()) {
      case "Y":
        try {
          await document.documentElement.requestFullscreen();
          setState((state) => ({ ...state, step: 2 }));
        } catch (error) {
          setState((state) => ({ ...state, step: 1 }));
        } finally {
        }
        break;
      case "N":
        setState((state) => ({ ...state, step: 2 }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    switch (state.step) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        history.push("/lock");
        break;
      default:
        break;
    }
  }, [state.step, history]);

  const split = useCallback((str: string) => {
    return str.split("").map((letter, i) =>
      letter === "\n" ? (
        <br />
      ) : (
        <span
          style={{
            animation: `fade 1s ${i / 4}s ease`
          }}
          key={`letter_${i}`}
        >
          {letter}
        </span>
      )
    );
  }, []);

  return (
    <main
      className={styles["boot"]}
      onMouseUp={() => customInputRef.current?.focus()}
    >
      {state.step === 0 && (
        <article>
          <h2>{split(header)}</h2>
          <br />
          <p>
            Cette application vous offrira une meilleure expérience en plein
            écran.
          </p>
          <br />
          <p>Souhaitez-vous activer cette fonctionnalité (Y/n)?</p>
        </article>
      )}
      {state.step === 1 && (
        <article>
          <p>Le plein écran a rencontré un problème...</p>
        </article>
      )}
      {state.step === 2 && (
        <article>
          <p>Chargement...</p>
        </article>
      )}
      <form action="#" method="post" onSubmit={handleSubmit}>
        <label>
          <textarea
            className={styles["custom-input"]}
            spellCheck="false"
            name="input"
            autoFocus
            rows={1}
            onChange={handleChange}
            ref={customInputRef}
            defaultValue={">"}
            onSelect={handleSelect}
          ></textarea>
        </label>
      </form>
    </main>
  );
};

export default Boot;
