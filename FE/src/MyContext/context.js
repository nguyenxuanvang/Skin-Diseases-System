import { createContext, useContext, useState } from 'react';

const MyContext = createContext();

export const useMyContext = () => {
  return useContext(MyContext);
};

export const MyProvider = ({ children }) => {
  const [data, setData] = useState("");

  const updateData = (newData) => {
    setData(newData);
  };
  return (
    <MyContext.Provider value={{ data, updateData }}>
      {children}
    </MyContext.Provider>
  );
};
export default MyContext;