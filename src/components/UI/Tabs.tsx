import classes from "./Tabs.module.scss";
import {
  memo,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "react";

interface IProps {
  className?: string;
  defaultValue?: number;
  direction: "bottom" | "left" | "right" | "top";
  onChange: (value: number) => void;
  separator?: boolean;
  shouldRefresh?: boolean;
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
  const {
    children,
    className,
    defaultValue,
    direction,
    onChange,
    separator,
    shouldRefresh
  } = props;

  const ref = useRef<HTMLDivElement>(null);
  const [tabValue, setTabValue] = useState<number>(defaultValue ?? 0);
  const [transition, setTransition] = useState<string>("");
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

  const refresh = useCallback(() => {
    const els = ref.current?.querySelectorAll("button:not(:last-child)");
    if (els) {
      const el = Array.from(els)[tabValue] as HTMLButtonElement;
      if (vertical) {
        setIndicatorPosition({
          top: el.offsetTop,
          height: el.offsetHeight
        });
      } else {
        setIndicatorPosition({
          left: el.offsetLeft,
          width: el.offsetWidth
        });
      }
    }
  }, [ref, vertical, tabValue]);

  useLayoutEffect(() => {
    if (shouldRefresh) {
      refresh();
      const it = setInterval(refresh, 10);
      return () => clearInterval(it);
    }
  }, [refresh, shouldRefresh]);

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

  useLayoutEffect(() => {
    const button: HTMLButtonElement | null =
      ref.current?.querySelector(`:nth-child(${(defaultValue || 0) + 1})`) ||
      null;
    if (button) {
      if (vertical) {
        setIndicatorPosition({
          top: button.offsetTop,
          height: button.offsetHeight
        });
        setTimeout(() => {
          setTransition("top 0.3s ease,height 0.3s ease");
        }, 0);
      } else {
        setIndicatorPosition({
          left: button.offsetLeft,
          width: button.offsetWidth
        });
        setTimeout(() => {
          setTransition("left 0.3s ease,width 0.3s ease");
        }, 0);
      }
    }
  }, [defaultValue, vertical]);

  const rootClasses = [classes["root"]];

  switch (direction) {
    case "bottom":
      rootClasses.push(classes["bottom"]);
      break;
    case "left":
      rootClasses.push(classes["left"]);
      break;
    case "right":
      rootClasses.push(classes["right"]);
      break;
    case "top":
      rootClasses.push(classes["top"]);
      break;
    default:
      break;
  }

  if (separator) rootClasses.push(classes["separator"]);
  if (className) rootClasses.push(className);

  return (
    <div
      aria-label={vertical ? "Onglets verticaux" : "Onglets horizontaux"}
      className={rootClasses.join(" ")}
    >
      <div className={classes["tabs"]} ref={ref} role="tablist">
        {children}
        <div
          className={classes["indicator"]}
          style={{
            ...indicatorPosition,
            transition: shouldRefresh ? "" : transition
          }}
        ></div>
      </div>
    </div>
  );
};

export default memo<PropsWithChildren<IProps>>(Tabs);
