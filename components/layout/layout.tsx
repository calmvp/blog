import { FC, Fragment, ReactNode } from "react";
import MainNavigation from "./main-navigation";

interface LayoutProps {
  children?: ReactNode
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{children}</main>
    </Fragment>
  )
}

export default Layout;