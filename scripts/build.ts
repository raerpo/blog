import fs from "fs";
import showdown from "showdown";
import frontmatter from "front-matter";
import { getIndex } from "../templates";
import { getFilesInFolder } from "../utils";
import { CONTENT_PATH, DATA_PATH } from "../config";
import { Frontmatter } from "../types";

function createIndex() {
  const { template } = getIndex();
  fs.writeFile(`${CONTENT_PATH}index.html`, template, (err) => {
      if (err) {
          console.error(err);
      }
      console.log(`index.html created!`);
  });
}

function compilePosts() {
  const converter = new showdown.Converter();
  const files = getFilesInFolder(DATA_PATH);

  files.forEach((file) => {
    fs.readFile(file, 'utf-8', (err, fileContent) => {
        if (err) {
            console.error('An error occurred:', err);
        } else {
          const { body, attributes } = frontmatter<Frontmatter>(fileContent);
            const htmlPost = converter.makeHtml(body);
            const postTemplate = fs.readFileSync(`${process.cwd()}/templates/post.html`, "utf-8");
            const postContent = postTemplate.replaceAll("{%% title %%}", attributes.title).replaceAll("{%% content %%}", htmlPost);
            const filename = file.split('/').at(-1);
            if (filename === undefined) {
                throw new Error(`Couldn't get the file name of path "${file}"`);
            }
            const htmlFilename = filename.replace(".md", ".html");
            fs.writeFile(`${CONTENT_PATH}${htmlFilename}`, postContent, (err) => {
                if (err) {
                    console.error(err);
                }
                console.log(`${htmlFilename} created!`);
            })
        }
    });
  })
}

function main() {
  if (!fs.existsSync(CONTENT_PATH)) {
    fs.mkdirSync(CONTENT_PATH);
  }
  compilePosts();
  createIndex();
}
main();
