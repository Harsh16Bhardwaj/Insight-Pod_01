import React from "react";

function Loader() {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-cyan-500"></div>
    </div>
  );
}

export default Loader;
