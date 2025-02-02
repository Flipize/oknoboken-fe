import { useState, useEffect } from "react";

interface Config {
  apiUrl: string;
  featureFlag: boolean;
}

const useConfig = () => {
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    fetch("/config.json")
      .then((res) => res.json())
      .then((data) => setConfig(data))
      .catch((err) => console.error("Failed to load config:", err));
  }, []);

  return config;
};

export default useConfig;
