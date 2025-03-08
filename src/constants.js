const devConfig = {
    BASE_URL: "https://back-house-dwfv.vercel.app/backhouse/",
    API_TIMEOUT: 5000,
    FEATURE_TOGGLE: {
      ENABLE_LOGS: true,
    },
  };
  
  const prodConfig = {
    BASE_URL: "https://api.yourdomain.com/backhouse/",
    API_TIMEOUT: 10000,
    FEATURE_TOGGLE: {
      ENABLE_LOGS: false,
    },
  };
  
  const ENVIRONMENT = process.env.REACT_APP_ENVIRONMENT || "development";
  
  const config = ENVIRONMENT === "production" ? prodConfig : devConfig;
  
  export default config;
  