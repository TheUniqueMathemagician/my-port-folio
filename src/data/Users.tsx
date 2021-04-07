import { createContext, FunctionComponent, useState, useContext } from "react";

import User from "./classes/User";

type Users = User[];

type UsersContextType = {
  user: User | null;
  setUser: (userID: string) => void;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<Users>>;
};

const UsersContext = createContext<UsersContextType>({
  user: null,
  setUser: () => {},
  users: [],
  setUsers: () => {}
});

const useUsers = () => useContext(UsersContext);

const UsersProvider: FunctionComponent = ({ children }) => {
  const [userID, setUserID] = useState<string>("");
  const [users, setUsers] = useState<Users>([]);

  return (
    <UsersContext.Provider
      value={{
        user: users.find((user) => userID === user.id) ?? null,
        setUser: (userID: string) => {
          setUserID(userID);
        },
        users,
        setUsers
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export { useUsers };
export default UsersProvider;
