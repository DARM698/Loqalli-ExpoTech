import React from "react";

export default function HostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="host-layout-container">
      {children}
    </div>
  );
}