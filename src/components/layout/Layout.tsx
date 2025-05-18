
import { useState } from "react";
import { 
  Header, 
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem
} from "@carbon/react";
import {
  Home,
  DataBase,
  DocumentAdd,
  Play,
  CheckmarkOutline,
  WarningAlt,
  ChartLineData,
  Settings,
  User,
  Logout
} from "@carbon/icons-react";

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
              <HeaderMenuButton
                aria-label="Open menu"
                onClick={() => setIsSideNavExpanded(!isSideNavExpanded)}
                isActive={isSideNavExpanded}
              />
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
              <SideNav
                aria-label="Side navigation"
                expanded={isSideNavExpanded}
                isPersistent={false}
              >
                <SideNavItems>
                  <SideNavLink renderIcon={Home} href="/">
                    Dashboard
                  </SideNavLink>
                  <SideNavMenu renderIcon={DataBase} title="Database">
                    <SideNavMenuItem href="/database/connections">
                      Connections
                    </SideNavMenuItem>
                    <SideNavMenuItem href="/database/schema">
                      Schema Browser
                    </SideNavMenuItem>
                  </SideNavMenu>
                  <SideNavMenu renderIcon={DocumentAdd} title="SQL Scripts">
                    <SideNavMenuItem href="/scripts/manage">
                      Manage Scripts
                    </SideNavMenuItem>
                    <SideNavMenuItem href="/scripts/upload">
                      Upload Scripts
                    </SideNavMenuItem>
                  </SideNavMenu>
                  <SideNavLink renderIcon={Play} href="/run">
                    Run Migrations
                  </SideNavLink>
                  <SideNavLink renderIcon={CheckmarkOutline} href="/validation">
                    Validation Results
                  </SideNavLink>
                  <SideNavLink renderIcon={WarningAlt} href="/issues">
                    Issues & Fixes
                  </SideNavLink>
                  <SideNavLink renderIcon={ChartLineData} href="/reports">
                    Reports
                  </SideNavLink>
                  <SideNavLink renderIcon={Settings} href="/settings">
                    Settings
                  </SideNavLink>
                </SideNavItems>
              </SideNav>
            </Header>
          </>
        )}
      />
      <div className={`cds--content ${isSideNavExpanded ? 'cds--content--expanded' : ''}`}>
        {children}
      </div>
    </>
  );
};

export default Layout;
