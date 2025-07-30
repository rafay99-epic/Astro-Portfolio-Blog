import React from 'react';
import { 
  FaMobile, 
  FaGlobe, 
  FaServer, 
  FaCloud,
  FaCode,
  FaDatabase,
  FaDocker,
  FaAws
} from 'react-icons/fa';

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
    
    if (title.includes('mobile') || title.includes('app')) {
      return <FaMobile className="w-5 h-5" />;
    }
    if (title.includes('web') || title.includes('frontend')) {
      return <FaGlobe className="w-5 h-5" />;
    }
    if (title.includes('full-stack') || title.includes('backend')) {
      return <FaServer className="w-5 h-5" />;
    }
    if (title.includes('cloud') || title.includes('devops')) {
      return <FaCloud className="w-5 h-5" />;
    }
    if (title.includes('database')) {
      return <FaDatabase className="w-5 h-5" />;
    }
    if (title.includes('docker')) {
      return <FaDocker className="w-5 h-5" />;
    }
    if (title.includes('aws')) {
      return <FaAws className="w-5 h-5" />;
    }
    
    // Default icon
    return <FaCode className="w-5 h-5" />;
  };

  return (
    <div className="flex flex-col gap-3">
      {services.slice(0, 4).map((service, index) => (
        <div 
          key={index}
          className="service-item flex items-center gap-3 text-[#a9b1d6] hover:text-[#7aa2f7] transition-all duration-200 cursor-pointer group"
        >
          <div className="flex items-center justify-center w-6 h-6 group-hover:scale-110 transition-transform duration-200">
            {getIcon(service.title)}
          </div>
          <span className="text-sm font-medium">{service.title}</span>
        </div>
      ))}
    </div>
  );
};

export default ServicesIcons; 