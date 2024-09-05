import React from 'react';

const Loader = ({ progress, fadingOut }) => (
  <div
    className={`fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50 transition-opacity duration-1000 ${fadingOut ? 'opacity-0' : 'opacity-100'}`}
    aria-busy="true"
    aria-label="Carregando"
  >
    <div className="text-black text-center">
      <div className="mt-4 text-lg">{progress}%</div>
    </div>
  </div>
);

export default Loader;
