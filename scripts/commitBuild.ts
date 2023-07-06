import { exec } from 'child_process';

export const commitBuildedFiles = () => {
  const commitMessage = "[generated_commit]: build blog content";

  exec("git add public/*", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing 'git add': ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`'git add' stderr: ${stderr}`);
      return;
    }

    exec(`git commit -m "${commitMessage}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing 'git commit': ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`'git commit' stderr: ${stderr}`);
        return;
      }

      console.log("Git commit successful!");
    });
  });
};

function main() {
  commitBuildedFiles();
}
main();