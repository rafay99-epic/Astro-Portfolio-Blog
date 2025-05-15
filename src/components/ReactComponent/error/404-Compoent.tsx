import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const NotFoundPage: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      gsap.fromTo(
        svgRef.current.querySelectorAll(".animate"),
        { y: -10 },
        {
          y: 10,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          duration: 2,
        }
      );
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-3xl font-mono">Oops! You're Lost in Code</h1>

      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 100"
        width="400"
        height="100"
      >
        <text
          className="animate"
          x="20%"
          y="50%"
          fontSize="36"
          fontFamily="monospace"
          fill="#FF5555"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {"<"}400{">"}
        </text>
        <text
          className="animate"
          x="50%"
          y="50%"
          fontSize="36"
          fontFamily="monospace"
          fill="#FFAA00"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {"{"}ERROR{"}"}
        </text>
        <text
          className="animate"
          x="80%"
          y="50%"
          fontSize="36"
          fontFamily="monospace"
          fill="#55FF55"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {"</>"}
        </text>
      </svg>

      <p className="text-lg font-mono">
        It seems like you have wandered into uncharted code territory. Click{" "}
        <a href="/" className="text-blue-400 underline">
          here
        </a>{" "}
        to go back.
      </p>
    </div>
  );
};

export default NotFoundPage;
