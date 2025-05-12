
import { useState, useContext } from "react";
import {
  Header as CarbonHeader,
  HeaderGlobalAction,
  HeaderMenuButton,
  HeaderName,
  HeaderPanel,
  HeaderGlobalBar,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
} from "@carbon/react";
import { Logout, ChevronDown, Menu, Close } from "@carbon/icons-react";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";
import IBMLogo from "../icons/IBMLogo";

type HeaderProps = {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
};

type QuestionnaireItem = {
  id: string;
  title: string;
};

const questionnaires: QuestionnaireItem[] = [
  { id: "db-migration", title: "Database Migration Questionnaire" },
  { id: "sp-conversion", title: "Stored Procedure Conversion Setup" },
  { id: "optimization", title: "Performance Optimization Preferences" },
  { id: "schema-mapping", title: "Schema Mapping Configuration" },
];

const Header = ({ toggleSidebar, sidebarOpen }: HeaderProps) => {
  const [isQuestionnairesOpen, setIsQuestionnairesOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  return (
    <CarbonHeader aria-label="IBM AI Database Migration">
      <HeaderMenuButton
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        onClick={toggleSidebar}
        isActive={sidebarOpen}
      />
      
      <HeaderName prefix="" href="/">
        <div className="flex items-center gap-2">
          <IBMLogo className="h-6 w-6" />
          <span className="hidden md:block">AI Database Migration</span>
        </div>
      </HeaderName>
      
      <HeaderNavigation aria-label="Main navigation">
        <HeaderMenu menuLinkName="Questionnaires" aria-label="Questionnaires">
          {questionnaires.map((item) => (
            <HeaderMenuItem href={`/questionnaire/${item.id}`} key={item.id}>
              {item.title}
            </HeaderMenuItem>
          ))}
          <HeaderMenuItem href="/questionnaire/create">
            Create New Questionnaire
          </HeaderMenuItem>
        </HeaderMenu>
      </HeaderNavigation>
      
      <HeaderGlobalBar>
        <HeaderGlobalAction
          aria-label="Log out"
          onClick={handleLogout}
          tooltipAlignment="end"
        >
          <Logout size={20} />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </CarbonHeader>
  );
};

export default Header;
