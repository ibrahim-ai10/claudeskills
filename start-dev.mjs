import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const nextBin = join(__dirname, "node_modules", "next", "dist", "bin", "next");

const port = process.env.PORT || 3000;

const child = spawn(
  process.execPath,
  [nextBin, "dev", "--port", String(port)],
  { stdio: "inherit", cwd: __dirname }
);

child.on("exit", (code) => process.exit(code ?? 0));
