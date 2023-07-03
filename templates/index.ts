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
  });

  const indexTemplate = fs.readFileSync(`${process.cwd()}/templates/index.html`, "utf-8");
  const postContent = filesData.map(({ filename, created, updated, title, preview }) => `<li class="m-8 list-none border-2 rounded-lg p-2">
    <a href="/${filename}.html">
      <small>${created}</small>
      <h3>${title}</h3>
      <p>${preview}...</p>
    </a>
  </li>`).join("");
  const template = indexTemplate.replace("{%% content %%}", postContent);

  return {
    template,
  };
};
