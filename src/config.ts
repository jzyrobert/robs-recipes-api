import { CorsOptions } from "cors";

export const MONGO_URL = process.env.MONGODB || "localhost:27017";

export const LISTEN_PORT = process.env.PORT || 3000;

export const TOKEN_SECRET =
  process.env.TOKEN_SECRET || "UNSECURE-TOKEN-DO-NOT-USE-IN-PRODUCTION";

export const DEV_TOKEN = "UNSECURE-TOKEN-DO-NOT-USE-IN-PRODUCTION";

export const DEFAULT_TOKEN_EXPIRY =
  process.env.DEFAULT_TOKEN_EXPIRY || 24 * 60 * 60; // 24 hours

export const CORS_OPTIONS: CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "*",
  preflightContinue: false,
};
