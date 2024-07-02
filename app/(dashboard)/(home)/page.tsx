import { SearchParams } from "@/lib/consts";
import { getRooms } from "@/use-cases/room";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { DashboardFilters } from "./_components/dashboard-filters";
import { RoomList } from "./_components/room-list";

async function DashBoardPage({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  const rooms = await getRooms({
    favorite: !!searchParams?.[SearchParams.FAVORITES],
    search: searchParams?.[SearchParams.SEARCH],
  });

  console.log(rooms)

  return (
    <div className="space-y-10">
      <DashboardFilters />
      <Suspense>
        <RoomList rooms={rooms} />
      </Suspense>
    </div>
  );
}

export default DashBoardPage;
