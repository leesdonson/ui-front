import { createContext, useState } from "react";
import { UserProps } from "../types/models";

interface UserContextType {
  user: UserProps;
  setUser: React.Dispatch<React.SetStateAction<UserProps>>;
}

const initialUser = {
  user: {
    name: "",
    email: "",
  },
  setUser: (user: UserProps) => user,
} as UserContextType;

export const UserContext = createContext<UserContextType>(initialUser);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProps>({
    name: "",
    email: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
