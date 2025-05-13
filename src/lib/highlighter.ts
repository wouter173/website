import { createHighlighter } from 'shiki'
import { myTheme } from './my-theme'

const langs = ['ts', 'tsx', 'css', 'html', 'json']
const highlighter = await createHighlighter({ themes: [myTheme], langs })

export { highlighter }
