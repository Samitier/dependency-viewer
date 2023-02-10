import { allowedFileExtensions } from "../models/AllowedFileExtensions"

export function getFullRelativePath(filename: string, directoryList: string[] = []): string {
  if (filename.startsWith("./")) {
    return getFullRelativePath(filename.replace("./", ""), directoryList)
  } else if (filename.startsWith("../")) {
    return getFullRelativePath(filename.replace("../", ""), directoryList.slice(0, -1))
  }
  const directoryPath = directoryList.reduce((prev, curr) => `${prev}${curr}/`, "")
  const nameWithoutExtension = allowedFileExtensions.reduce(
    (name, extension) => name.replace(extension, ""),
    filename
  )
  return `./${directoryPath}${nameWithoutExtension}`
}
