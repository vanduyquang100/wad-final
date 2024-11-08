import createError from "http-errors";
import express, { json, urlencoded } from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { specs, swaggerUi } from "./swagger.js";

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// view engine setup
app.set("views", join(__dirname, "views"));
app.set("view engine", "jade"); // Ensure you have jade/pug installed

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public"))); // Correctly setting up static middleware

// Ensure connectDB is defined or imported correctly
// Import your database connection function here
import connectDB from "./config/db.js";
connectDB();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
