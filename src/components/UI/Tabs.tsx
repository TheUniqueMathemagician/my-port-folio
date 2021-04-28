import classes from "./Tabs.module.scss";
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";

// TODO: needs to be replaced with radios

interface IProps {
  defaultValue?: number;
  direction: "bottom" | "left" | "right" | "top";
  onChange: (value: number) => void;
  separator?: boolean;
}

const Tabs: FunctionComponent<IProps> = (props) => {
  const { onChange, children, defaultValue, direction, separator } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<number>(defaultValue ?? 0);

  const handleInput = useCallback((e: Event) => {
    e.stopPropagation();
    setState((e as CustomEvent).detail);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.addEventListener("input", handleInput);
    }
    return () => {
      if (el) {
        el.removeEventListener("input", handleInput);
      }
    };
  }, [handleInput]);

  useEffect(() => {
    onChange(state);
  }, [state, onChange]);

  const classesList = [classes["root"]];

  switch (direction) {
    case "bottom":
      classesList.push(classes["bottom"]);
      break;
    case "left":
      classesList.push(classes["left"]);
      break;
    case "right":
      classesList.push(classes["right"]);
      break;
    case "top":
      classesList.push(classes["top"]);
      break;
    default:
      break;
  }

  if (separator) {
    classesList.push(classes["separator"]);
  }

  const vertical = direction === "left" || direction === "right";

  if (vertical) {
    return (
      <div
        aria-label={"Onglets verticaux"}
        className={classesList.join(" ")}
        ref={ref}
      >
        <div
          className={classes["indicator"]}
          style={{
            transform: `translateY(${state * 100}%)`,
            transition: "transform 0.3s ease"
          }}
        ></div>
        {children}
      </div>
    );
  }

  return (
    <div
      aria-label={"Onglets horizontaux"}
      className={classesList.join(" ")}
      ref={ref}
    >
      <div
        className={classes["indicator"]}
        style={{
          transform: `translateX(${state * 100}%)`,
          transition: "transform 0.3s ease"
        }}
      ></div>
      {children}
    </div>
  );
};

export default Tabs;
