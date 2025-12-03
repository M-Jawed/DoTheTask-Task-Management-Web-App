import Board from "./components/Board";
import SideNav from "./components/SideNav";

export default function Home() {
  return (
    <main className="flex h-screen w-full">
      <SideNav />
      <Board />
    </main>
  );
}
