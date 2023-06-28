import fs from "fs";
import { userInfo } from "os";

function main() {
    const currentTime = new Date().toISOString();
    const userName = userInfo().username || "User Name"
    const frontmatter =`---
title: Blog post title
date: ${currentTime}
author: ${userName}
categories:
- category name
tags:
- tag name
---

`;
    const filename = `${currentTime}.md`;
    fs.writeFile(`${process.cwd()}/data/${filename}`, frontmatter, (err) => {
        if (err) {
            console.error(err);
        }
        console.log(`The new post is named: ${filename}`);
    })
}

main();