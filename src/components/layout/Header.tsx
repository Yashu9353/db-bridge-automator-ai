
import { useState } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
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
  
  return (
    <header className="bg-carbon-gray-100 text-white">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className="text-white hover:text-carbon-gray-30 transition-colors"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="flex items-center gap-2">
            <IBMLogo className="h-8 w-8" />
            <span className="text-lg font-medium hidden md:block">
              AI Database Migration
            </span>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsQuestionnairesOpen(!isQuestionnairesOpen)}
            className="flex items-center gap-2 px-3 py-2 hover:bg-carbon-blue transition-colors"
          >
            <span>Questionnaires</span>
            {isQuestionnairesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {isQuestionnairesOpen && (
            <div className="absolute right-0 mt-1 bg-white text-carbon-gray-100 shadow-lg border border-carbon-gray-20 w-72 z-50">
              <ul className="py-1">
                {questionnaires.map((item) => (
                  <li key={item.id}>
                    <a 
                      href={`/questionnaire/${item.id}`}
                      className="block px-4 py-2 text-sm hover:bg-carbon-gray-10 transition-colors"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
                <li className="border-t border-carbon-gray-20">
                  <a 
                    href="/questionnaire/create"
                    className="block px-4 py-2 text-sm text-carbon-blue hover:bg-carbon-gray-10 transition-colors"
                  >
                    Create New Questionnaire
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
