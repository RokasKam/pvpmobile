import React, {createContext, useContext, useState} from 'react';

const UserContextVariable = createContext();

export const useUserContext = () => {
  return useContext(UserContextVariable);
};

export const UserContext = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <UserContextVariable.Provider value={{user, setUser}}>
      {children}
    </UserContextVariable.Provider>
  );
};
