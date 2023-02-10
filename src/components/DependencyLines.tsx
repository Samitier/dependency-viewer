import { shallow } from "zustand/shallow"
import { useFilesStore } from "../store/useFilesStore"
import css from "./DependencyLines.module.css"

type Props = {
  fileId: string
}
const offset = 35
export function DependencyLines(props: Props) {
  const file = useFilesStore((state) => state.files.find((f) => f.id === props.fileId), shallow)
  const dependencies = useFilesStore((state) =>
    state.files.filter((f) => file?.dependencies.includes(f.id), shallow)
  )

  if (!file || !dependencies.length) return <></>

  return (
    <svg className={css.dependencyLines} viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}>
      <defs>
        <marker
          id="arrowhead"
          fill="#888"
          markerWidth="10"
          markerHeight="7"
          refX="8"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" />
        </marker>
      </defs>
      {dependencies.map((d, i) => (
        <line
          key={`${file.id}-${d.id}`}
          x1={file.x + offset}
          y1={file.y + offset}
          x2={d.x}
          y2={d.y + offset}
          stroke="#888"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />
      ))}
    </svg>
  )
}
