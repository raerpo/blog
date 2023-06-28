import fs from "fs";
import { getNewPost } from "../templates"

function main() {
    const { template, filename } = getNewPost();
    fs.writeFile(`${process.cwd()}/data/${filename}`, template, (err) => {
        if (err) {
            console.error(err);
        }
        console.log(`The new post is named: ${filename}`);
    });
}

main();