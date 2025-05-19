
import { Tile } from "@carbon/react";

type DashboardCardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
};

const DashboardCard = ({ title, children, className = "", action }: DashboardCardProps) => {
  return (
    <Tile className={className}>
      <div className="cds--tile-header cds--mb-04">
        <h2 className="cds--type-productive-heading-03">{title}</h2>
        {action && <div>{action}</div>}
      </div>
      <div>
        {children}
      </div>
    </Tile>
  );
};

export default DashboardCard;
