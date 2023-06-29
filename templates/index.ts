import os from "os";
import { getFilesInFolder } from "../utils";
import { DATA_PATH } from "../constants";

export const getNewPost = () => {
  const currentTime = new Date().toISOString();
  const userName = os.userInfo().username || "User Name";
  const template = `
---
title: Blog post title
date: ${currentTime}
author: ${userName}
categories:
- category name
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
  const files = getFilesInFolder(DATA_PATH)
    .map((filepath) => filepath.split("/").at(-1)!)
    .map((markdownFileName) => markdownFileName.replace(".md", ""));

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
        ${files.map((file) => `<li><a href="/${file}">${file}</a></li>`)}
    </ul>
</body>
</html>
`;

  return {
    template,
  };
};
