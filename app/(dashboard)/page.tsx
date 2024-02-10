import { DashboardFilters } from "./_components/dashboard-filters";
import { RoomList } from "./_components/room-list";

function DashBoardPage() {
  return (
    <div className="space-y-10">
      <DashboardFilters />
      <RoomList />
    </div>
  );
}

export default DashBoardPage;
