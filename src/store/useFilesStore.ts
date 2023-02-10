import { create } from "zustand"
import { SystemFile } from "../models/SystemFile"

type FilesStore = {
  files: SystemFile[]
  setFiles: (files: SystemFile[]) => void
  setFilePosition: (id: string, x: number, y: number) => void
}

export const useFilesStore = create<FilesStore>((set) => ({
  files: [],
  setFiles(files) {
    set((state) => ({
      ...state,
      files: [...files],
    }))
  },
  setFilePosition(id, x, y) {
    set((state) => {
      const file = state.files.find((f) => f.id === id)
      if (!file) return state
      const files = state.files.filter((f) => f.id !== id)
      const newFile = { ...file, x, y }
      return {
        ...state,
        files: [...files, newFile],
      }
    })
  },
}))
