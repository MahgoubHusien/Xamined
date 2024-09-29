import React from "react";
import Marquee from "react-fast-marquee"; // Ensure to install this with `npm install react-fast-marquee`
import { cn } from "@/lib/utils";

const MarqueeComponent = ({
  children,
  reverse = false,
  className = "",
  pauseOnHover = false,
}: {
  children: React.ReactNode;
  reverse?: boolean;
  className?: string;
  pauseOnHover?: boolean;
}) => {
  return (
    <Marquee
      reverse={reverse}
      className={cn("flex items-center gap-4", className)}
      pauseOnHover={pauseOnHover}
      gradient={false}
    >
      {children}
    </Marquee>
  );
};

export default MarqueeComponent;
