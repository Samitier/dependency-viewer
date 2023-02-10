import { getFullRelativePath } from "./getFullRelativePath"

// From https://regexr.com/47jlq
const importRegex =
  /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g

export function getDependencies(fileContents: string, directoryList: string[] = []) {
  return (
    fileContents
      .match(importRegex)
      ?.map((importStr) => {
        const [_, path] = importStr.replace(/\"/g, "'").split("'")
        return path
      })
      // grab only relative modules
      .filter((p) => p.startsWith("./") || p.startsWith("../"))
      // map to absolute module
      .map((p) => getFullRelativePath(p, directoryList)) ?? []
  )
}
