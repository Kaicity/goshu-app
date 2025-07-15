import React from "react";

const Loading: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-muted">
    <div className="w-16 h-16 border-4 border-muted-foreground border-t-primary rounded-full animate-spin" />
    <p className="mt-6 text-muted-foreground text-lg">Loading...</p>
  </div>
);

export default Loading;
