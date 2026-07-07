import React from 'react';

export const CenterPlanet: React.FC = () => {
  return (
    <div className="center-planet" id="center">
      <div style={{ position: 'relative' }}>
        <div className="planet-glow"></div>
        <div className="planet-body">
          <div className="planet-ring"></div>
        </div>
      </div>
      <div className="planet-name">전영주</div>
      <div className="planet-sub">Frontend Developer</div>
    </div>
  );
};

export default CenterPlanet;
