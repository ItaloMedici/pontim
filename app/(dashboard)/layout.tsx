import { NavBar } from "./_components/nav-bar";

interface DashBoardLayoutProps {
  children: React.ReactNode;
}

function DashBoardLayout({ children }: DashBoardLayoutProps) {
  return (
    <div className="max-w-screen-lg mx-auto">
      <NavBar />
      <main className="pt-16 max-w-screen-lg px-4 h-full">{children}</main>
    </div>
  );
}

export default DashBoardLayout;
