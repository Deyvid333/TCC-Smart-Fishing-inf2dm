import React from 'react';

const FishAnimation = () => {
  const fishEmojis = ['🐟', '🐠', '🐡', '🦈', '🐙', '🦑'];
  
  return (
    <div className="fish-animation-container">
      {fishEmojis.map((fish, index) => (
        <div 
          key={index} 
          className={`swimming-fish ${index % 2 === 0 ? '' : 'reverse'}`}
        >
          {fish}
        </div>
      ))}
    </div>
  );
};

export default FishAnimation;