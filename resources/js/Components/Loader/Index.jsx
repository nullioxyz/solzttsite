import React from 'react';

const Loader = ({ progress }) => (
  <div
    className="fixed inset-0 bg-black flex items-center justify-center z-50"
    aria-busy="true"
  >
    <div className="text-white text-center">
      <div className="mt-2 w-10 h-10 border-4 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
      <div className="mt-4 text-lg">{progress}%</div> {/* Exibe a porcentagem */}
    </div>
  </div>
);

export default Loader;
