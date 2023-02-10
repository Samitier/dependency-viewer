import { MouseEventHandler, useEffect, useState } from "react"
import { shallow } from "zustand/shallow"
import { useFilesStore } from "../store/useFilesStore"
import css from "./FileBox.module.css"

type Props = {
  fileId: string
}

export function FileBox(props: Props) {
  const file = useFilesStore((state) => state.files.find((f) => f.id === props.fileId), shallow)

  const setFilePosition = useFilesStore((state) => state.setFilePosition)
  const [baseMousePosition, setBaseMousePosition] = useState([] as number[])

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove)
    return () => document.removeEventListener("mousemove", onMouseMove)
  }, [baseMousePosition])

  function onMouseMove(event: MouseEvent) {
    if (!baseMousePosition.length || !file) return
    const xMovement = event.clientX - baseMousePosition[0]
    const yMovement = event.clientY - baseMousePosition[1]
    setBaseMousePosition([event.clientX, event.clientY])
    setFilePosition(props.fileId, file.x + xMovement, file.y + yMovement)
  }

  const events: Record<string, MouseEventHandler<HTMLDivElement>> = {
    onMouseDown(event) {
      setBaseMousePosition([event.clientX, event.clientY])
    },
    onMouseLeave(event) {
      setBaseMousePosition([])
    },
    onMouseUp(event) {
      setBaseMousePosition([])
    },
  }

  if (!file) return <></>
  return (
    <>
      <div className={`${css.fileBox} card`} style={{ left: file.x, top: file.y }} {...events}>
        <h5>{file.name}</h5>
      </div>
    </>
  )
}
