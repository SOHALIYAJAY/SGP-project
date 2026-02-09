import { GlowCard } from "@/components/ui/spotlight-card";

export default function Demo() {
  return (
    <div className="min-h-screen flex gap-8 items-center justify-center bg-background">
      <GlowCard glowColor="blue" />
      <GlowCard glowColor="purple" />
      <GlowCard glowColor="green" />
    </div>
  );
}
