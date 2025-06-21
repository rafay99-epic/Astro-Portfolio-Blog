// import React, { useState, useRef } from "react";
// import { FiCopy, FiMaximize2, FiX, FiCheck } from "react-icons/fi";

// interface MermaidWrapperProps {
//   children: React.ReactNode;
//   source?: string;
//   title?: string;
// }

// export const MermaidWrapper: React.FC<MermaidWrapperProps> = ({
//   children,
//   source,
//   title = "Diagram",
// }) => {
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const diagramRef = useRef<HTMLDivElement>(null);

//   const handleCopy = async () => {
//     try {
//       if (source) {
//         // Copy mermaid source code
//         await navigator.clipboard.writeText(source);
//       } else {
//         // Copy as text representation
//         const svgElement = diagramRef.current?.querySelector("svg");
//         if (svgElement) {
//           const svgString = new XMLSerializer().serializeToString(svgElement);
//           await navigator.clipboard.writeText(svgString);
//         }
//       }
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       console.error("Failed to copy diagram:", err);
//     }
//   };

//   const handleFullscreen = () => {
//     setIsFullscreen(true);
//   };

//   const closeFullscreen = () => {
//     setIsFullscreen(false);
//   };

//   return (
//     <>
//       {/* Main Diagram Container */}
//       <div className="relative group">
//         <div
//           ref={diagramRef}
//           className="overflow-x-auto bg-theme-bg-card rounded-lg border border-theme-border-primary p-4"
//         >
//           {children}
//         </div>

//         {/* Control Buttons */}
//         <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//           <button
//             onClick={handleCopy}
//             className="flex items-center gap-1 px-3 py-2 bg-theme-bg-secondary/90 hover:bg-theme-bg-secondary border border-theme-border-primary rounded-lg text-theme-text-primary text-sm transition-all duration-200 backdrop-blur-sm"
//             title="Copy diagram"
//           >
//             {copied ? (
//               <>
//                 <FiCheck className="w-4 h-4" />
//                 <span>Copied!</span>
//               </>
//             ) : (
//               <>
//                 <FiCopy className="w-4 h-4" />
//                 <span>Copy</span>
//               </>
//             )}
//           </button>

//           <button
//             onClick={handleFullscreen}
//             className="flex items-center gap-1 px-3 py-2 bg-theme-bg-secondary/90 hover:bg-theme-bg-secondary border border-theme-border-primary rounded-lg text-theme-text-primary text-sm transition-all duration-200 backdrop-blur-sm"
//             title="View fullscreen"
//           >
//             <FiMaximize2 className="w-4 h-4" />
//             <span>Fullscreen</span>
//           </button>
//         </div>
//       </div>

//       {/* Fullscreen Modal */}
//       {isFullscreen && (
//         <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
//           <div className="relative max-w-7xl max-h-full w-full bg-theme-bg-primary rounded-xl border border-theme-border-accent shadow-2xl overflow-hidden">
//             {/* Modal Header */}
//             <div className="flex items-center justify-between p-4 border-b border-theme-border-primary bg-theme-bg-secondary">
//               <h3 className="text-lg font-semibold text-theme-text-primary">
//                 {title}
//               </h3>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={handleCopy}
//                   className="flex items-center gap-1 px-3 py-2 bg-theme-bg-card hover:bg-theme-bg-primary border border-theme-border-primary rounded-lg text-theme-text-primary text-sm transition-all duration-200"
//                   title="Copy diagram"
//                 >
//                   {copied ? (
//                     <>
//                       <FiCheck className="w-4 h-4" />
//                       <span>Copied!</span>
//                     </>
//                   ) : (
//                     <>
//                       <FiCopy className="w-4 h-4" />
//                       <span>Copy</span>
//                     </>
//                   )}
//                 </button>
//                 <button
//                   onClick={closeFullscreen}
//                   className="p-2 hover:bg-theme-bg-card rounded-lg text-theme-text-secondary hover:text-theme-text-primary transition-all duration-200"
//                   title="Close fullscreen"
//                 >
//                   <FiX className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>

//             {/* Modal Content */}
//             <div className="p-6 overflow-auto max-h-[calc(100vh-120px)] bg-theme-bg-card">
//               <div className="flex justify-center">{children}</div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
