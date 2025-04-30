import { motion, type Variants } from "framer-motion";
import { FaBookOpen } from "react-icons/fa";
import clsx from "clsx";

type SubjectGridProps = {
  subjects: { name: string; noteCount?: number }[];
};

const bgColors = [
  "bg-gradient-to-br from-gray-800 to-gray-900",
  "bg-gradient-to-br from-blue-700 to-blue-900",
  "bg-gradient-to-br from-white/10 to-white/5",
  "bg-gradient-to-br from-white/5 to-transparent",
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.3)",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: {
    scale: 0.97,
    transition: { type: "spring", stiffness: 400, damping: 20 },
  },
};

/**
 * Renders a responsive, animated grid of subject cards with interactive hover effects.
 *
 * Each card displays the subject name, an optional note count, and links to a subject-specific notes page. Cards feature animated transitions and decorative backgrounds for enhanced user interaction.
 *
 * @param subjects - Array of subject objects, each with a name and optional note count, to display in the grid.
 */
export default function SubjectGrid({ subjects }: SubjectGridProps) {
  return (
    <motion.section
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 p-6 md:p-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {subjects.map((subject, idx) => (
        <motion.a
          key={subject.name}
          href={`/ms_notes/${subject.name}`}
          className={clsx(
            "relative block rounded-2xl text-white p-6 overflow-hidden group",
            "border border-white/10 shadow-lg hover:border-white/20 transition-all duration-300",
            bgColors[idx % bgColors.length]
          )}
          variants={itemVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%224%22%20height%3D%224%22%20viewBox%3D%220%200%204%204%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20fill-opacity%3D%221%22%20d%3D%22M1%203h1v1H1V3zm2-2h1v1H3V1z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E')]"></div>

          <div className="relative z-10 flex flex-col justify-between h-full min-h-[150px]">
            {" "}
            <div className="flex justify-end">
              <FaBookOpen className="text-white/30 text-4xl transition-all duration-300 group-hover:text-white/60 group-hover:scale-110 group-hover:-translate-y-1" />
            </div>
            <div className="mt-4">
              {" "}
              <h3 className="text-xl font-semibold tracking-tight leading-tight mb-1">
                {subject.name}
              </h3>
              <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300">
                {subject.noteCount !== undefined
                  ? `${subject.noteCount} ${subject.noteCount === 1 ? "note" : "notes"} available`
                  : "Explore Notes"}
              </p>
            </div>
          </div>

          <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-10 transition-opacity duration-500">
            <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:left-[100%] transition-all duration-700 ease-in-out" />
          </div>

          <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[60px] border-l-transparent border-b-[60px] border-b-white/5 group-hover:border-b-white/10 transition-all duration-300 ease-in-out transform group-hover:scale-[1.1]"></div>
        </motion.a>
      ))}
    </motion.section>
  );
}
