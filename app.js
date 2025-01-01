import createError from "http-errors";
import express, { json, urlencoded } from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { specs, swaggerUi } from "./swagger.js";
import { redisClient } from "./config/redisConfig.js";
import { RedisStore } from "connect-redis";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import indexViewRouter from "./routes/views/index.js";
import usersApiRouter from "./routes/apis/users.js";
import productsApiRouter from "./routes/apis/products.js";
import cartsApiRouter from "./routes/apis/cart.js";
import ordersApiRouter from "./routes/apis/order.js";
import productViewRouter from "./routes/views/products.js";
import cartViewRouter from "./routes/views/carts.js";
import orderViewRouter from "./routes/views/order.js";
import userViewRouter from "./routes/views/users.js";
import session from "express-session";
import passport from "passport";
import flash from "connect-flash";
import { configurePassport } from "./config/passportConfig.js";

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

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5174",
    "https://vanduyquang.space",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
};
app.use(cors(corsOptions));

// Ensure connectDB is defined or imported correctly
// Import your database connection function here
import connectDB from "./config/db.js";
connectDB();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// Configure Passport
configurePassport(passport);

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use("/", indexViewRouter);
app.use("/products", productViewRouter);
app.use("/carts", cartViewRouter);
app.use("/orders", orderViewRouter);
app.use("/users", userViewRouter);
app.use("/api/users", usersApiRouter);
app.use("/api/products", productsApiRouter);
app.use("/api/carts", cartsApiRouter);
app.use("/api/orders", ordersApiRouter);

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
