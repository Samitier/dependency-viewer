import { FileBox } from "./components/FileBox"
import css from "./App.module.css"
import { useFilesStore } from "./store/useFilesStore"
import { shallow } from "zustand/shallow"
import { DependencyLines } from "./components/DependencyLines"
import { DirectoryPicker } from "./components/DirectoryPicker"

export function App() {
  const fileIds = useFilesStore((state) => state.files.map((f) => f.id), shallow)
  return (
    <div className={css.mainContainer}>
      {fileIds.map((fileId) => (
        <FileBox key={`file-${fileId}`} fileId={fileId} />
      ))}
      {fileIds.map((fileId) => (
        <DependencyLines key={`lines-${fileId}`} fileId={fileId} />
      ))}
      {!fileIds.length ? <DirectoryPicker /> : <></>}
    </div>
  )
}
