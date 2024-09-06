import { MdPreview } from 'md-editor-rt'
import 'md-editor-rt/lib/preview.css'

interface MarkdownViewerProps {
  data?: string
  className?: string
}

export function MarkdownViewer({ data, className }: MarkdownViewerProps) {
  return (
    <>
      <MdPreview className={className} modelValue={data || ''} />
    </>
  )
}
