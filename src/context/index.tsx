import * as React from "react";

interface Props {
  children: JSX.Element | JSX.Element[];
}
interface IContext {
  backdrop: {
    isOpen: boolean;
    openBackdrop: () => void;
    closeBackdrop: () => void;
  };
}

const Context = React.createContext<IContext>({} as IContext);

export const AppProvider = ({ children }: Props): JSX.Element => {
  const [backdrop, setBackdrop] = React.useState<boolean>(false);

  const openBackdrop = () => {
    setBackdrop(true);
  };
  const closeBackdrop = () => {
    setBackdrop(false);
  };

  return (
    <Context.Provider
      value={{
        backdrop: {
          isOpen: backdrop,
          openBackdrop,
          closeBackdrop,
        },
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => {
  return React.useContext(Context);
};
