import fs from "fs";
import path from "path";

export function getFilesInFolder(folderPath: string): string[] {
  // TODO: make sure to return only markdown files
  try {
    const files = fs.readdirSync(folderPath);
    return files.map((file) => path.join(folderPath, file));
  } catch (err) {
    console.error("An error occurred:", err);
    return [];
  }
}
