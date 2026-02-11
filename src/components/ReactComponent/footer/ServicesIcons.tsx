import type React from "react";
import {
	FaAws,
	FaCloud,
	FaCode,
	FaDatabase,
	FaDocker,
	FaGlobe,
	FaMobile,
	FaServer,
} from "react-icons/fa";

interface Service {
	title: string;
	description: string;
	icon: string;
	features: string[];
	technologies: string[];
}

interface ServicesIconsProps {
	services: Service[];
}

const ServicesIcons: React.FC<ServicesIconsProps> = ({ services }) => {
	const getIcon = (serviceTitle: string) => {
		const title = serviceTitle.toLowerCase();

		if (title.includes("mobile") || title.includes("app")) {
			return <FaMobile className="h-5 w-5" />;
		}
		if (title.includes("web") || title.includes("frontend")) {
			return <FaGlobe className="h-5 w-5" />;
		}
		if (title.includes("full-stack") || title.includes("backend")) {
			return <FaServer className="h-5 w-5" />;
		}
		if (title.includes("cloud") || title.includes("devops")) {
			return <FaCloud className="h-5 w-5" />;
		}
		if (title.includes("database")) {
			return <FaDatabase className="h-5 w-5" />;
		}
		if (title.includes("docker")) {
			return <FaDocker className="h-5 w-5" />;
		}
		if (title.includes("aws")) {
			return <FaAws className="h-5 w-5" />;
		}

		return <FaCode className="h-5 w-5" />;
	};

	return (
		<div className="flex flex-col gap-3">
			{services.slice(0, 4).map((service) => (
				<div
					key={service.title}
					className="service-item group flex cursor-pointer items-center gap-3 text-[#a9b1d6] transition-all duration-200 hover:text-[#7aa2f7]"
				>
					<div className="flex h-6 w-6 items-center justify-center transition-transform duration-200 group-hover:scale-110">
						{getIcon(service.title)}
					</div>
					<span className="text-sm font-medium">{service.title}</span>
				</div>
			))}
		</div>
	);
};

export default ServicesIcons;
