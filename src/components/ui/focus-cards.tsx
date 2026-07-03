"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
    onClick,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    onClick?: (card: any) => void;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onClick={() => onClick && onClick(card.originalData || card)}
      className={cn(
        "rounded-3xl relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-80 w-full transition-all duration-300 ease-out cursor-pointer shadow-lg",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      <img
        src={card.src}
        alt={card.title}
        className="object-cover absolute inset-0 w-full h-full transition-transform duration-700 hover:scale-110"
      />
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end py-8 px-6 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
          {card.title}
        </div>
        {card.description && (
          <p className="mt-2 text-sm text-neutral-300 line-clamp-2">
            {card.description}
          </p>
        )}
      </div>
    </div>
  )
);

Card.displayName = "Card";

export type FocusCardType = {
  title: string;
  src: string;
  description?: string;
  originalData?: any; // To pass back original github repo data
};

export function FocusCards({ cards, onCardClick }: { cards: FocusCardType[], onCardClick?: (data: any) => void }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title + index}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
}
