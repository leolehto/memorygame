import React from 'react';

interface CardProps {
  id: number;
  name: string;
  flipped: boolean;
  onClick: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ id, name, flipped, onClick }) => {
  return (
    <div className="card" onClick={() => onClick(id)}>
      {flipped ? <div className="card-content">{name}</div> : <div className="card-back"></div>}
    </div>
  );
};

export default Card;