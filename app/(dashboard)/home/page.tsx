import { SearchParams } from "@/lib/consts";
import { getRooms } from "@/use-cases/room";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { DashboardFilters } from "./_components/dashboard-filters";
import { DashboardMessages } from "./_components/messages";
import { RoomList, RoomListSkeleton } from "./_components/room-list";

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
    user: session.user,
  });

  if (searchParams?.error) {
    console.error(searchParams?.error);
  }

  return (
    <div className="space-y-10">
      <DashboardFilters />
      <DashboardMessages />
      <Suspense fallback={<RoomListSkeleton />}>
        <RoomList rooms={rooms} />
      </Suspense>
    </div>
  );
}

export default DashBoardPage;
