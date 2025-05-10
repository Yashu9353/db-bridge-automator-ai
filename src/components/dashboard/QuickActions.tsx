
import { Upload, Database, Play, ChevronRight } from "lucide-react";

const QuickActions = () => {
  const actions = [
    {
      title: "Upload Scripts",
      description: "Import SQL and stored procedure scripts",
      icon: Upload,
      href: "/scripts/upload",
      color: "bg-carbon-blue text-white"
    },
    {
      title: "Connect Database",
      description: "Configure source and target connections",
      icon: Database,
      href: "/database/connections",
      color: "bg-carbon-blue-70 text-white"
    },
    {
      title: "Run Migration",
      description: "Execute database migration and conversion",
      icon: Play,
      href: "/run",
      color: "bg-carbon-blue-80 text-white"
    }
  ];
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {actions.map((action) => (
        <a 
          key={action.title}
          href={action.href}
          className={`${action.color} p-4 flex flex-col hover:shadow-md transition-shadow`}
        >
          <div className="flex justify-between items-center mb-3">
            <action.icon size={24} />
            <ChevronRight size={18} />
          </div>
          <h3 className="font-medium text-lg mb-1">{action.title}</h3>
          <p className="text-sm opacity-80">{action.description}</p>
        </a>
      ))}
    </div>
  );
};

export default QuickActions;
