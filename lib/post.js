//@ts-check
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from files and set it as the `id`
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postsDirectory, fileName);
    // get the content of the .md files
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Psrse the metadata section
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  // Sort by date
  return allPostsData.sort((a, b) => {
    // @ts-ignore
    if (a.date < b.date) return 1;
    else return -1;
  });
}
