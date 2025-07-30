import React, { memo, useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Phone,
  FileText,
  Palette,
  Settings,
  Code,
  Zap,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
} from "lucide-react";

const processSteps = [
  {
    step: "01",
    title: "Discovery Call",
    description: "Understanding your business and identifying pain points",
    icon: Phone,
    details: [
      "Get to know the client",
      "Understand their business",
      "Analyze existing products",
      "Identify pain points",
    ],
  },
  {
    step: "02",
    title: "Requirements & Planning",
    description: "Comprehensive planning and solution approach",
    icon: FileText,
    details: [
      "Write down requirements",
      "Note everything systematically",
      "Plan the solution approach",
      "Set project timeline",
    ],
  },
  {
    step: "03",
    title: "Design & Approval",
    description: "Visual designs and client approval process",
    icon: Palette,
    details: [
      "Set design timeline",
      "Create visual mockups",
      "Get client approval",
      "Finalize design specs",
    ],
  },
  {
    step: "04",
    title: "Development Setup",
    description: "Infrastructure and deployment pipeline setup",
    icon: Settings,
    details: [
      "Setup CI/CD pipeline",
      "Configure live preview",
      "Prepare deployment infrastructure",
      "Ensure smooth delivery",
    ],
  },
  {
    step: "05",
    title: "Coding & Testing",
    description: "Clean code development with thorough testing",
    icon: Code,
    details: [
      "Start development",
      "Write clean code",
      "Fix bugs systematically",
      "Document codebase",
    ],
  },
  {
    step: "06",
    title: "Final Review & Delivery",
    description: "Project delivery and service setup",
    icon: Zap,
    details: [
      "Final client meeting",
      "Deliver the project",
      "Setup payment for services",
      "Close the project",
    ],
  },
];

const ProcessShowcase = memo(function ProcessShowcase() {
  const [activeStep, setActiveStep] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const nextStep = () => {
    setActiveStep((prev) => (prev + 1) % processSteps.length);
  };

  const prevStep = () => {
    setActiveStep((prev) => (prev - 1 + processSteps.length) % processSteps.length);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaX > 10 || e.deltaY > 10) {
      nextStep();
    } else if (e.deltaX < -10 || e.deltaY < -10) {
      prevStep();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsDragging(false);
  };

  return (
    <section
      ref={ref}
      className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#1a1b26] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#c0caf5] mb-4">
            How We{" "}
            <span className="bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] bg-clip-text text-transparent">
              Build Stuff
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#a9b1d6] max-w-2xl mx-auto">
            A streamlined process that delivers results efficiently
          </p>
        </motion.div>

        {/* Slider Container */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {/* Navigation Buttons */}
          <button
            onClick={prevStep}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-[#24283b]/80 backdrop-blur-sm border border-[#414868]/50 rounded-full flex items-center justify-center text-[#a9b1d6] hover:text-[#7aa2f7] hover:border-[#7aa2f7]/50 transition-all duration-300 -ml-6"
            disabled={activeStep === 0}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={nextStep}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-[#24283b]/80 backdrop-blur-sm border border-[#414868]/50 rounded-full flex items-center justify-center text-[#a9b1d6] hover:text-[#7aa2f7] hover:border-[#7aa2f7]/50 transition-all duration-300 -mr-6"
            disabled={activeStep === processSteps.length - 1}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Slider */}
          <div
            ref={sliderRef}
            className="overflow-hidden rounded-xl"
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div
              className="flex"
              animate={{ x: `-${activeStep * 100}%` }}
              transition={{ 
                type: "tween", 
                duration: 0.6, 
                ease: "easeInOut"
              }}
            >
              {processSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={step.step}
                    className="w-full flex-shrink-0 px-2 sm:px-4"
                  >
                    <div className="bg-[#24283b]/50 border border-[#414868]/30 rounded-xl p-6 sm:p-8 h-full">
                      {/* Step Header */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#c0caf5] mb-2">
                            {step.title}
                          </h3>
                          <p className="text-sm sm:text-base text-[#a9b1d6]">
                            {step.description}
                          </p>
                        </div>
                        <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-[#7aa2f7] flex-shrink-0" />
                      </div>

                      {/* Step Details */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-[#7aa2f7] uppercase tracking-wider">
                          What We Do
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {step.details.map((detail, detailIndex) => (
                            <motion.div
                              key={detail}
                              className="flex items-center gap-3"
                              initial={{ opacity: 0, x: -10 }}
                              animate={
                                index === activeStep
                                  ? { opacity: 1, x: 0 }
                                  : { opacity: 0.7, x: 0 }
                              }
                              transition={{ 
                                duration: 0.4, 
                                ease: "easeOut",
                                delay: detailIndex * 0.08 
                              }}
                            >
                              <CheckCircle className="w-4 h-4 text-[#9ece6a] flex-shrink-0" />
                              <span className="text-sm sm:text-base text-[#a9b1d6]">
                                {detail}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {processSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === activeStep
                    ? "bg-[#7aa2f7] scale-125"
                    : "bg-[#414868] hover:bg-[#7aa2f7]/50"
                }`}
              />
            ))}
          </div>

          {/* Step Counter */}
          <div className="text-center mt-4">
            <span className="text-sm text-[#a9b1d6]">
              <span className="text-[#7aa2f7] font-semibold">
                {String(activeStep + 1).padStart(2, "0")}
              </span>{" "}
              / {String(processSteps.length).padStart(2, "0")}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export default ProcessShowcase;