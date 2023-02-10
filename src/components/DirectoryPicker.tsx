import { useFilesStore } from "../store/useFilesStore"
import { getFilesOfDirectory } from "../utils/getFilesOfDirectory"

export function DirectoryPicker() {
  const setFiles = useFilesStore((state) => state.setFiles)

  async function selectDirectory() {
    const directoryHandle = await window.showDirectoryPicker()
    const files = await getFilesOfDirectory(directoryHandle)
    const sortedFiles = files
      .sort((a, b) => a.id.localeCompare(b.id))
      // Shit code to try to not have boxes overlapping
      .map((file, i) => {
        const offset = 50
        const xSeparation = 250
        const ySeparation = 200
        const x = (offset + xSeparation * i) % (window.innerWidth - offset)
        const y =
          offset +
          Math.floor((offset + xSeparation * i) / (window.innerWidth - offset)) * ySeparation
        return {
          ...file,
          x,
          y,
        }
      })
    setFiles(sortedFiles)
  }
  return (
    <div className="container">
      <h4>Choose a directory to start analyzing the dependencies</h4>
      <button onClick={selectDirectory}>Pick directory</button>
    </div>
  )
}
