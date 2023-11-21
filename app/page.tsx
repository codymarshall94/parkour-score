import ScoreCalculator from "@/components/ScoreCalculator/ScoreCalculator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ScoreCalculator />
    </main>
  );
}
