import { motion } from "framer-motion";
import experienceData from "@config/siteConfig/info.json";

const workExperience = experienceData.workExperience;

export default function ExperienceSideTimeline() {
  return (
    <section className="py-10 px-6">
      <h2 className="text-center text-5xl font-bold text-[--text-light] mb-10">
        Job Experience
      </h2>
      <div className="relative">
        {workExperience.map((job, i) => (
          <motion.div
            key={i}
            className={`mb-12 flex flex-col ${
              i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } items-start md:items-center gap-6`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-4 h-4 bg-[--accent] rounded-full mt-2 md:mt-0" />
            <div
              className="bg-[--gray-dark] rounded-xl p-6 w-full md:w-2/3 shadow-md"
              style={{ boxShadow: "var(--box-shadow)" }}
            >
              <h3 className="text-xl font-bold text-[--accent]">
                {job.position} @ {job.companyName}
              </h3>
              <p className="text-sm text-gray-400 mb-2">{job.employmentTime}</p>
              <ul className="list-disc pl-5 text-sm text-gray-300 mb-2">
                {job.roles.map((r, idx) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {job.toolsUsed.map((tech, id) => (
                  <span
                    key={id}
                    className="bg-gray-600 rounded-full px-3 py-1 text-sm hover:bg-gray-500 transition-transform duration-200 hover:scale-105"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
