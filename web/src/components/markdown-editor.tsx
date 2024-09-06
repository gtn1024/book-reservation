import { MdEditor } from 'md-editor-rt'
import 'md-editor-rt/lib/style.css'

interface MarkdownEditorProps {
  data?: string
  onChange?: (data: string) => void
  className?: string
}

export function MarkdownEditor({ data, onChange, className }: MarkdownEditorProps) {
  return (
    <>
      <MdEditor modelValue={data || ''} onChange={onChange} className={className} />
    </>
  )
}
