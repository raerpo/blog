import fs from "fs";
import { getNewPost } from "../templates"

function main() {
    const { template, filename } = getNewPost();
    const filePath = `${process.cwd()}/data/${filename}`;
    fs.writeFile(filePath, template, (err) => {
        if (err) {
            console.error(err);
        }
        console.log(`The new post is located here:\n${filePath}`);
    });
}
main();