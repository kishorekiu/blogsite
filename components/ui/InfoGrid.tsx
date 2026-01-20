import React from "react";
import InfoCard, { InfoCardProps } from "./InfoCard";
interface InfoGridProps {
  cards: InfoCardProps[];
  cols?: number;
}
const InfoGrid = (props: InfoGridProps) => {
  const { cards, cols } = props;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {cards?.map((card: InfoCardProps, index: number) => (
        <InfoCard
          title={card.title}
          description={card.description}
          icon={card.icon}
          key={index}
        />
      ))}
    </div>
  );
};

export default InfoGrid;
