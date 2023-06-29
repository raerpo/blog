import os from "os";
import fs from "fs";
import frontmatter from "front-matter";
import { getFilesInFolder } from "../utils";
import { DATA_PATH, BODY_PREVIEW_LENGTH } from "../config";
import { Frontmatter } from "../types";

export const getNewPost = () => {
  const currentTime = new Date().toISOString();
  const userName = os.userInfo().username || "User Name";
  const template = `---
title: Blog post title
author: ${userName}
category: category name (used to create series)
tags:
- tag name
---
    
`;
  return {
    template,
    filename: `${currentTime}.md`,
  };
};

export const getIndex = () => {
  const filesPaths = getFilesInFolder(DATA_PATH);

  const filesData = filesPaths.map(filePath => {
    const { birthtime: created, mtime: updated } = fs.statSync(filePath);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { attributes, body } = frontmatter(fileContent);
    const { title, author, tags } = attributes as Frontmatter;
    return {
      created,
      updated,
      path: filePath,
      filename: filePath.split("/").at(-1)!.replace(".md", ""),
      preview: body.substring(0, BODY_PREVIEW_LENGTH),
      title,
      author,
      tags
    }
  })


  const template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Raerpo's Blog</title>
</head>
<body>
    <h2>Blog Timeline</h2>
    <ul>
        ${filesData.map(({ filename, created, updated, title, preview }) => `<li>
            <a href="/${filename}.html">
              <small>${created}</small>
              <h3>${title}</h3>
              <p>${preview}...</p>
            </a>
        </li>`).join("")}
    </ul>
</body>
</html>
`;

  return {
    template,
  };
};
