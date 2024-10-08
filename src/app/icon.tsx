import { ImageResponse } from "next/og"

export const runtime = "edge"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"
export const dynamic = "force-static"

export default function Icon() {
  return new ImageResponse(
    (
      <div tw="flex items-center justify-center w-8 h-8 bg-black pt-0.5">
        <svg width="24" height="14" viewBox="0 0 39 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13.1484 22.3103L0.344971 0.654304H8.5779L16.624 13.074L18.2779 10.5374L12.3844 0.654304H20.992L28.5517 13.5698L30.1598 10.9228L26.3215 4.47093L28.5517 0.654304H38.1246L25.214 22.3273L19.1054 11.9373L13.1484 22.3103Z"
            fill="white"
          />
        </svg>
      </div>
    ),
    { ...size },
  )
}
