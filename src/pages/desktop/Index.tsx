import { useEffect } from "react";
import { useHistory } from "react-router";
import { useUsers } from "../../data/Users";

const Index = () => {
  const { user } = useUsers();
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push("/workspace");
    } else {
      history.push("/lock");
    }
  }, [user, history]);

  return <main></main>;
};

export default Index;
