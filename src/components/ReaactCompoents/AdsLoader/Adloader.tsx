import React, { useEffect, useState } from "react";

const AdLoader: React.FC = () => {
  const [adBlockerDetected, setAdBlockerDetected] = useState(false);

  useEffect(() => {
    const detectAdBlocker = async () => {
      const adScript = document.createElement("script");
      adScript.src =
        "//pl24384595.cpmrevenuegate.com/75a9e4d4cdc61042594f971bcbc143dd/invoke.js";
      adScript.async = true;
      adScript.dataset.cfasync = "false";

      adScript.onload = () => setAdBlockerDetected(false);
      adScript.onerror = () => setAdBlockerDetected(true);

      const adContainer = document.getElementById(
        "container-75a9e4d4cdc61042594f971bcbc143dd"
      );
      if (adContainer) {
        adContainer.appendChild(adScript);
      } else {
        setAdBlockerDetected(true);
      }
    };

    detectAdBlocker();
  }, []);

  return (
    <div className="ad-container">
      <h2 className="text-2xl font-semibold mb-4">Advertisements</h2>
      <div id="container-75a9e4d4cdc61042594f971bcbc143dd"></div>

      {adBlockerDetected && (
        <div id="ad-blocker-message" className="text-red-500 font-bold">
          It looks like you are using an ad blocker. Please disable it to
          support our site.
        </div>
      )}
    </div>
  );
};

export default AdLoader;
