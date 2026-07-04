import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import app from "./app.js";
import connectDB from "./db/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: join(__dirname, "../.env"),
  override: true,
});

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error", err);
    process.exit(1);
  });
