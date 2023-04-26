import React, { ReactNode } from "react";
import Header from "./header/Header";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div className="p-16">{children}</div>
    </>
  );
};

export default Layout;
