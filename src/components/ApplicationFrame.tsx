import { useState, useRef, ElementType, useEffect, useCallback } from "react";
import style from "styled-components";

const Card = style.div`
  position: fixed;
`;

const Header = style.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px;
  background: #3333337F;
  border-radius: 16px 16px 0 0;
  backdrop-filter: blur(10px);
`;

const Button = style.button`
  background: red;
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
  backdrop-filter: blur(10px);
  min-height: 500px;
  position: relative;
`;

interface State {}

const ApplicationFrame: ElementType<State> = ({ children }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const cardRef = useRef<HTMLDivElement>(null);

  const dropHandler = useCallback((e: globalThis.DragEvent) => {
    setPosition({
      x: e.pageX - offset.x,
      y: e.pageY - offset.y,
    });
  }, [offset])
  
  const dragStartHandler = (e: React.DragEvent) => {
    const card = cardRef.current;
    if (!card) return;
    setOffset({
      x: e.pageX - parseInt(card.style.left),
      y: e.pageY - parseInt(card.style.top),
    });
    return false;
  };

  useEffect(() => {
    document.addEventListener("drop", dropHandler);
  },[dropHandler]);

  useEffect(() => {
    return () => {
      document.removeEventListener("drop", dropHandler);
    };
  },[dropHandler]);

  return (
    <Card
      style={{
        top: position.y,
        left: position.x,
      }}
      ref={cardRef}
      draggable="true"
      onDragStart={(e) => dragStartHandler(e)}
    >
      <Header>
        <Button></Button>
        <Button></Button>
        <Button></Button>
      </Header>
      <Background>{children}</Background>
    </Card>
  );
};

export default ApplicationFrame;
