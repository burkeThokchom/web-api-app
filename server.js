import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import passport from "passport";
import swaggerUi from "swagger-ui-express";

import swaggerSpec from "./src/config/swagger.js";
import "./src/config/passport.js"; // initialize passport strategies

import logger from "./src/utils/logger.js";
import routes from "./src/routes/index.js";
import { errorHandler } from "./src/middleware/errorHandler.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ===== Middleware =====
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(passport.initialize());

// ===== Documentation =====
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ===== Routes =====
app.use("/", routes);

// ===== Error Handling =====
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info({ msg: `🚀 API server running on port ${PORT}` });
});
