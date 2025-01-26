import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const soundsPath = path.join(process.cwd(), "public/sounds");
  const files = fs.readdirSync(soundsPath);
  res.status(200).json(files);
}