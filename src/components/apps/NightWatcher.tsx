import { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "../../hooks/Store";

interface IProps {}

const NightWatcher: FunctionComponent<IProps> = () => {
  const count = useSelector(
    (store) => Object.keys(store.applications.instances).length
  );
  const [hasWarned, setHasWarned] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("I'm watching");
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (count > 30 && !hasWarned) {
      alert("Attention, il se peut que les performances soient réduites");
      setHasWarned(true);
    }
  }, [count, hasWarned]);

  return null;
};

export default NightWatcher;
