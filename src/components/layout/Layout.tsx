
import { useState } from "react";
import { 
  Header, 
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  Content
} from "@carbon/react";
import {
  Settings,
  User,
  Logout
} from "@carbon/icons-react";
import Sidebar from "./Sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(true);
  
  return (
    <>
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
          <>
            <Header aria-label="IBM Database Migration">
              <SkipToContent />
              <HeaderName href="/" prefix="">
                IBM Database Migration
              </HeaderName>
              <HeaderNavigation aria-label="IBM Database Migration">
                <HeaderMenuItem href="/questionnaire">Questionnaires</HeaderMenuItem>
                <HeaderMenuItem href="/database/connections">Connections</HeaderMenuItem>
                <HeaderMenuItem href="/conversion/editor">Conversion</HeaderMenuItem>
              </HeaderNavigation>
              <HeaderGlobalBar>
                <HeaderGlobalAction aria-label="Settings" tooltipAlignment="end">
                  <Settings size={20} />
                </HeaderGlobalAction>
                <HeaderGlobalAction aria-label="User" tooltipAlignment="end">
                  <User size={20} />
                </HeaderGlobalAction>
                <HeaderGlobalAction aria-label="Logout" tooltipAlignment="end">
                  <Logout size={20} />
                </HeaderGlobalAction>
              </HeaderGlobalBar>
            </Header>
          </>
        )}
      />
      <div className="cds--side-nav-container">
        <Sidebar isOpen={isSideNavExpanded} />
        <Content className={isSideNavExpanded ? 'cds--content--expanded' : ''}>
          {children}
        </Content>
      </div>
    </>
  );
};

export default Layout;
