
import { useState, useContext } from "react";
import { 
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
  Button
} from "@carbon/react";
import { 
  Home, 
  DataBase, 
  DocumentPdf, 
  Play, 
  CheckmarkOutline, 
  WarningAlt, 
  ChartLineData, 
  Settings, 
  Logout 
} from "@carbon/icons-react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../App";

type SidebarProps = {
  isOpen: boolean;
};

const Sidebar = ({ isOpen }: SidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label) 
        : [...prev, label]
    );
  };

  return (
    <div className="cds--side-nav--fixed">
      <SideNav 
        expanded={isOpen}
        aria-label="Side navigation"
        isRail={!isOpen}
      >
        <SideNavItems>
          <SideNavLink renderIcon={Home} href="/" isActive={location.pathname === '/'}>
            Dashboard
          </SideNavLink>
          
          <SideNavMenu 
            renderIcon={DataBase} 
            title="Database" 
            isActive={location.pathname.startsWith('/database')}
          >
            <SideNavMenuItem href="/database/connections" isActive={location.pathname === '/database/connections'}>
              Connections
            </SideNavMenuItem>
            <SideNavMenuItem href="/database/schema" isActive={location.pathname === '/database/schema'}>
              Schema Browser
            </SideNavMenuItem>
          </SideNavMenu>
          
          <SideNavMenu 
            renderIcon={DocumentPdf} 
            title="SQL Scripts" 
            isActive={location.pathname.startsWith('/scripts')}
          >
            <SideNavMenuItem href="/scripts/manage" isActive={location.pathname === '/scripts/manage'}>
              Manage Scripts
            </SideNavMenuItem>
            <SideNavMenuItem href="/scripts/upload" isActive={location.pathname === '/scripts/upload'}>
              Upload Scripts
            </SideNavMenuItem>
          </SideNavMenu>
          
          <SideNavLink renderIcon={Play} href="/run" isActive={location.pathname === '/run'}>
            Run Migrations
          </SideNavLink>
          
          <SideNavLink renderIcon={CheckmarkOutline} href="/validation" isActive={location.pathname === '/validation'}>
            Validation Results
          </SideNavLink>
          
          <SideNavLink renderIcon={WarningAlt} href="/issues" isActive={location.pathname === '/issues'}>
            Issues & Fixes
          </SideNavLink>
          
          <SideNavLink renderIcon={ChartLineData} href="/reports" isActive={location.pathname === '/reports'}>
            Reports
          </SideNavLink>
          
          <SideNavLink renderIcon={Settings} href="/settings" isActive={location.pathname === '/settings'}>
            Settings
          </SideNavLink>
        </SideNavItems>
        
        <div className="cds--side-nav__footer">
          <div className="cds--side-nav__user-info">
            <div className="cds--side-nav__user-avatar" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--cds-interactive-01)' }}>
              JD
            </div>
            <div>
              <p className="cds--side-nav__user-name">Logged in</p>
              <p className="cds--side-nav__user-status">Administrator</p>
            </div>
          </div>
          <Button 
            kind="ghost" 
            size="sm" 
            onClick={handleLogout} 
            renderIcon={Logout}
            iconDescription="Logout"
          >
            Log out
          </Button>
        </div>
      </SideNav>
    </div>
  );
};

export default Sidebar;
