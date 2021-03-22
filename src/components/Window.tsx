import {
  ElementType,
  MouseEvent,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import style from "styled-components";
import { context as FrameContext } from "./WindowFrame";

const Card = style.div`
  position: absolute;
  transition: opacity .3s ease;
  backdrop-filter: blur(6px);
  border-radius: 16px;
`;

const Header = style.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px;
  background: #3333337F;
  border-radius: 16px 16px 0 0;
`;

const RedButton = style.button`
  background: #FF5853;
  height: 14px;
  width: 14px;
  border-radius: 50%;
  border: 0;
  margin-right: 8px;
  outline: none;
  cursor: pointer;
  box-shadow: 0 0 6px 0 #00000033;
  :active {
    box-shadow: inset 0px 0px 8px 0px rgba(0,0,0,0.3);
    transform: scale(0.9);
  }
`;

const OrangeButton = style.button`
  background: #FFBC40;
  height: 14px;
  width: 14px;
  border-radius: 50%;
  border: 0;
  margin-right: 8px;
  outline: none;
  cursor: pointer;
  box-shadow: 0 0 6px 0 #00000033;
  :active {
    box-shadow: inset 0px 0px 8px 0px rgba(0,0,0,0.3);
    transform: scale(0.9);
  }
`;

const GreenButton = style.button`
  background: #45D97E;
  height: 14px;
  width: 14px;
  border-radius: 50%;
  border: 0;
  margin-right: 8px;
  outline: none;
  cursor: pointer;
  box-shadow: 0 0 6px 0 #00000033;
  :active {
    box-shadow: inset 0px 0px 8px 0px rgba(0,0,0,0.3);
    transform: scale(0.9);
  }
`;

const Background = style.div`
  background: #ffffff7f;
  border-radius: 0 0 16px 16px;
  min-height: 500px;
  position: relative;
`;

interface State {
  onRed?: (e: MouseEvent) => void;
  onOrange?: (e: MouseEvent) => void;
  onGreen?: (e: MouseEvent) => void;
}

const Window: ElementType<State> = ({ children, onRed, onOrange, onGreen }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const frameContext = useContext(FrameContext);

  const cardRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const mouseDownHandler = useCallback((e: MouseEvent) => {
    e.preventDefault();

    const card = cardRef.current;
    if (!card) return;

    setOffset({
      x: e.pageX - parseInt(card.style.left),
      y: e.pageY - parseInt(card.style.top),
    });

    setDragging(true);
  }, []);
  const mouseMoveHandler = useCallback(
    (e: globalThis.MouseEvent) => {
      e.preventDefault();

      document.body.style.cursor = "grabbing";

      const header = headerRef.current;
      if (!header) return;

      let x = e.pageX - offset.x;
      let y = e.pageY - offset.y;

      if (x < frameContext.x1) {
        x = frameContext.x1;
      }
      if (y < frameContext.y1) {
        y = frameContext.y1;
      }
      if (x + header.clientWidth > frameContext.x2) {
        x = frameContext.x2 - header.clientWidth;
      }
      if (y + header.clientHeight > frameContext.y2) {
        y = frameContext.y2 - header.clientHeight;
      }

      setPosition({ x, y });
    },
    [offset, frameContext, headerRef]
  );
  const mouseUpHandler = useCallback((e: globalThis.MouseEvent) => {
    document.body.style.cursor = "";
    e.preventDefault();
    setDragging(false);
  }, []);

  const redActionHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (onRed) {
        onRed(e);
      }
    },
    [onRed]
  );
  const orangeActionHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (onOrange) {
        onOrange(e);
      }
    },
    [onOrange]
  );
  const greenActionHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (onGreen) {
        onGreen(e);
      }
    },
    [onGreen]
  );

  useLayoutEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    } else {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    }
    return () => {
      if (dragging) {
        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
      } else {
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
      }
    };
  }, [dragging, mouseMoveHandler, mouseUpHandler]);

  return (
    <Card
      style={{
        top: position.y,
        left: position.x,
      }}
      ref={cardRef}
      onDragStart={() => false}
      draggable="false"
    >
      <Header
        onMouseDown={mouseDownHandler}
        style={{ cursor: dragging ? "grabbing" : "grab" }}
        onDrag={() => false}
        draggable="false"
        ref={headerRef}
      >
        <RedButton onClick={(e) => redActionHandler(e)}></RedButton>
        <OrangeButton onClick={(e) => orangeActionHandler(e)}></OrangeButton>
        <GreenButton onClick={(e) => greenActionHandler(e)}></GreenButton>
      </Header>
      <Background>{children}</Background>
    </Card>
  );
};

export default Window;
