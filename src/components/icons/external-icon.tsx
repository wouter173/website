import { type SVGAttributes } from "react"
export const ExternalIcon = (props: SVGAttributes<SVGElement>) => {
  return (
    <>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M7 7h10v10" />
        <path d="M7 17 17 7" />
      </svg>
    </>
  )
}
