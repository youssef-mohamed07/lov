import { HomeBento } from "@/components/sections/home/bento";
import { suivi } from "@/data/suivi";

export function SuiviBento() {
  const { bento } = suivi;

  return (
    <HomeBento
      eyebrow={bento.eyebrow}
      title={
        <>
          {bento.title}{" "}
          <span className="mark-accent">{bento.titleAccent}</span>
        </>
      }
      description={bento.description}
    />
  );
}
