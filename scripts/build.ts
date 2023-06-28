import fs from "fs";
import path from "path";
import showdown from "showdown";

function getFilesInFolder(folderPath: string): string[] {
  try {
    const files = fs.readdirSync(folderPath);
    return files.map((file) => path.join(folderPath, file));
  } catch (err) {
    console.error("An error occurred:", err);
    return [];
  }
}

function main() {
  const converter = new showdown.Converter();
  const files = getFilesInFolder(`${process.cwd()}/data`);

  files.forEach((file) => {
    fs.readFile(file, 'utf-8', (err, fileContent) => {
        if (err) {
            console.error('An error occurred:', err);
        } else {
            const htmlPost = converter.makeHtml(fileContent);
            const filename = file.split('/').at(-1);
            if (filename === undefined) {
                throw new Error(`Couldn't get the file name of path "${file}"`);
            }
            fs.writeFile(`${process.cwd()}/content/${filename.replace(".md", ".html")}`, htmlPost, (err) => {
                if (err) {
                    console.error(err);
                }
                console.log(`${filename} published!`);
            })
        }
    });
  })

}
main();
