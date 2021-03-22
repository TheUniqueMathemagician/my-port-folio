import {
  ElementType,
  MouseEvent,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import style from "styled-components";

const Card = style.div`
  position: fixed;
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
`;

const Background = style.div`
  background: #ffffff7f;
  border-radius: 0 0 16px 16px;
  min-height: 500px;
  position: relative;
`;

interface State {}

const Window: ElementType<State> = ({ children }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const MouseDownHandler = useCallback((e: MouseEvent) => {
    console.log("down");
    e.preventDefault();

    const card = cardRef.current;
    if (!card) return;

    setOffset({
      x: e.pageX - parseInt(card.style.left),
      y: e.pageY - parseInt(card.style.top),
    });

    setDragging(true);
  }, []);

  const MouseMoveHandler = useCallback(
    (e: globalThis.MouseEvent) => {
      console.log("move");
      e.preventDefault();

      setPosition({
        x: e.pageX - offset.x,
        y: e.pageY - offset.y,
      });
    },
    [offset]
  );

  const MouseUpHandler = useCallback((e: globalThis.MouseEvent) => {
    console.log("up");
    e.preventDefault();
    setDragging(false);
  }, []);

  useLayoutEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", MouseMoveHandler);
      document.addEventListener("mouseup", MouseUpHandler);
    } else {
      document.removeEventListener("mousemove", MouseMoveHandler);
      document.removeEventListener("mouseup", MouseUpHandler);
    }
    return () => {
      if (dragging) {
        document.addEventListener("mousemove", MouseMoveHandler);
        document.addEventListener("mouseup", MouseUpHandler);
      } else {
        document.removeEventListener("mousemove", MouseMoveHandler);
        document.removeEventListener("mouseup", MouseUpHandler);
      }
    };
  }, [dragging, MouseMoveHandler, MouseUpHandler]);

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
        onMouseDown={MouseDownHandler}
        style={{ cursor: dragging ? "grabbing" : "grab" }}
        onDrag={() => false}
        draggable="false"
      >
        <RedButton></RedButton>
        <OrangeButton></OrangeButton>
        <GreenButton></GreenButton>
      </Header>
      <Background>{children}</Background>
    </Card>
  );
};

export default Window;
