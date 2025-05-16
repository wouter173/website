import { createHighlighter } from 'shiki'

const langs = ['ts', 'tsx', 'css', 'html', 'json']
const highlighter = await createHighlighter({ themes: ['min-light'], langs })

export { highlighter }
