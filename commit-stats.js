const { execSync } = require("child_process");

const author = process.argv.slice(2)[0] || "Erik";

(function main() {
  const commitsFromAuthor = execSync(`git log --oneline --author=${author}`)
    .toString()
    .split(/[\r\n]+/);

  const shas = commitsFromAuthor.map(commit => commit.split(" ")[0]);

  const stats = shas.reduce(
    (stats, sha) => {
      const commit = execSync(`git show ${sha} --stat`).toString();

      if (!commit.includes("package-lock.json") && !commit.includes("Merge pull request")) {
        const lines = commit.split(/[\r\n]+/).filter(line => line);
        const lastLine = lines[lines.length - 1];

        if (lastLine.includes("file")) {
          const statMeta = lastLine.split(", ");

          statMeta.forEach(stat => {
            if (stat.includes("file")) {
              stats.filesChanged.push(parseInt(stat || 0));
            } else if (stat.includes("insertion")) {
              stats.insertions.push(parseInt(stat || 0));
            } else if (stat.includes("deletion")) {
              stats.deletions.push(parseInt(stat || 0));
            }
          });
        }
      }
      return stats;
    },
    {
      filesChanged: [],
      insertions: [],
      deletions: []
    }
  );

  const totalInsertions = stats.insertions.reduce((total, insertions) => total + insertions, 0);
  const totalDeletions = stats.deletions.reduce((total, deletions) => total + deletions, 0);
  const totalFilesChanged = stats.filesChanged.reduce(
    (total, filesChanged) => total + filesChanged,
    0
  );

  console.log("author: ", author);
  console.log("total growth: ", totalInsertions - totalDeletions);
  console.log("average insertions: ", totalInsertions / stats.insertions.length);
  console.log("average deletions: ", totalDeletions / stats.deletions.length);
  console.log("average files changed: ", totalFilesChanged / stats.filesChanged.length);
})();
