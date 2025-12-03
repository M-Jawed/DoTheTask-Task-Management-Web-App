import Board from "./components/Board";
import Header from "./components/Header";

export default function Home() {
  return (
    <main className="flex flex-col h-screen w-full">
      <Header />
      <Board />
    </main>
  );
}
