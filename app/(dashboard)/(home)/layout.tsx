import { getServerSession } from "next-auth";
import { NavBar } from "./_components/nav-bar";

interface DashBoardLayoutProps {
  children: React.ReactNode;
}

async function DashBoardLayout({ children }: DashBoardLayoutProps) {
  const session = await getServerSession();

  if (!session?.user) return <>{children}</>;

  return (
    <div className="max-w-screen-lg mx-auto">
      <NavBar />
      <main className="pt-[84px] max-w-screen-lg px-4 h-full">{children}</main>
    </div>
  );
}

export default DashBoardLayout;
