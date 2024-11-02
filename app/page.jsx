import Test from "./layouts/test";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>HELLO</h1>
      <img src="/TRVG_Logo.png" alt="App Logo" width="100" height="100" />
      <Test />
      <h1>Dex test</h1>
    </div>
  );
}
