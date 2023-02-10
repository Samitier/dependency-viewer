import { allowedFileExtensions } from "../models/AllowedFileExtensions"
import { SystemFile } from "../models/SystemFile"
import { getDependencies } from "./getDependencies"
import { getFullRelativePath } from "./getFullRelativePath"

export async function getFilesOfDirectory(
  directoryHandle: FileSystemDirectoryHandle,
  directoryList: string[] = []
) {
  const files: SystemFile[] = []
  for await (const { kind, name } of directoryHandle.values()) {
    if (kind === "directory") {
      const innerDirHandle = await directoryHandle.getDirectoryHandle(name)
      const innerDirList = [...directoryList, name]
      const innerDirFiles = await getFilesOfDirectory(innerDirHandle, innerDirList)
      files.push(...innerDirFiles)
    } else if (allowedFileExtensions.some((f) => name.endsWith(f))) {
      const fileHandle = await directoryHandle.getFileHandle(name)
      const fileContents = await (await fileHandle.getFile()).text()
      const dependencies = getDependencies(fileContents, directoryList)
      files.push({
        id: getFullRelativePath(name, directoryList),
        name,
        x: 0,
        y: 0,
        dependencies,
      })
    }
  }
  return files
}
