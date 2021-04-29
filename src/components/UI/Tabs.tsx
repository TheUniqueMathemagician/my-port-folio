import classes from "./Tabs.module.scss";
import {
  Children,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
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

interface IVerticalPosition {
  height: number;
  top: number;
}
interface IHorizontalPosition {
  left: number;
  width: number;
}

const Tabs: FunctionComponent<IProps> = (props) => {
  const { onChange, children, defaultValue, direction, separator } = props;

  const ref = useRef<HTMLDivElement>(null);
  const [tabValue, setTabValue] = useState<number>(defaultValue ?? 0);
  const [indicatorPosition, setIndicatorPosition] = useState<
    IHorizontalPosition | IVerticalPosition
  >({
    height: 0,
    left: 0,
    top: 0,
    width: 0
  });

  const vertical = useMemo(
    () => direction === "left" || direction === "right",
    [direction]
  );

  const handleInput = useCallback(
    (e: Event) => {
      e.stopPropagation();
      const event = e as CustomEvent;
      const target = e.target as HTMLDivElement;
      setTabValue(event.detail);

      if (vertical) {
        setIndicatorPosition({
          top: target.offsetTop,
          height: target.offsetHeight
        });
      } else {
        setIndicatorPosition({
          left: target.offsetLeft,
          width: target.offsetWidth
        });
      }
    },
    [vertical]
  );

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
    onChange(tabValue);
  }, [tabValue, onChange]);

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
            top: (indicatorPosition as IVerticalPosition).top,
            height: (indicatorPosition as IVerticalPosition).height,
            transition: "all 0.3s ease"
          }}
        ></div>
        {children}
      </div>
    );
  } else {
    return (
      <div
        aria-label={"Onglets horizontaux"}
        className={classesList.join(" ")}
        ref={ref}
      >
        <div
          className={classes["indicator"]}
          style={{
            left: (indicatorPosition as IHorizontalPosition).left,
            width: (indicatorPosition as IHorizontalPosition).width,
            transition: "all 0.3s ease"
          }}
        ></div>
        {children}
      </div>
    );
  }
};

export default Tabs;
