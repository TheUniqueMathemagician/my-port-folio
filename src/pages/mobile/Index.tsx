import { useEffect } from "react";
import { useHistory } from "react-router";

const Index = () => {
  const history = useHistory();
  useEffect(() => {
    history.replace("/boot");
  }, [history]);
  return null;
};

export default Index;
