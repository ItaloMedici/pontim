import { SearchParams } from "@/lib/consts";
import { getDecksSelection } from "@/use-cases/deck";
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

  const decks = await getDecksSelection({
    userEmail: session.user.email,
  });

  if (searchParams?.error) {
    console.error(searchParams?.error);
  }

  return (
    <div className="space-y-10">
      <DashboardFilters />
      <DashboardMessages />
      <Suspense fallback={<RoomListSkeleton />}>
        <RoomList rooms={rooms} decks={decks} />
      </Suspense>
    </div>
  );
}

export default DashBoardPage;
