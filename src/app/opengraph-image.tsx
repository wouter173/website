import { ImageResponse } from 'next/og'
import path from 'node:path'
import fs from 'node:fs'

export const contentType = 'image/png'

export default function GET() {
  const filePath = path.join(process.cwd(), 'public/noise.png')
  const file = fs.readFileSync(filePath)
  const base64 = Buffer.from(file).toString('base64')

  return new ImageResponse(
    <div tw="flex items-center justify-center w-full h-full bg-[#0d0d0d] text-neutral-600">
      <div tw="absolute inset-0 flex w-full h-full opacity-10">
        <img style={{ opacity: 0.5 }} src={`data:image/png;base64,${base64}`} width={1200} height={600} alt="" />
      </div>
      <div tw="flex flex-col items-center justify-center">
        <svg width="180" height="103" viewBox="0 0 242 139" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_i_2550_896)">
            <path
              d="M81.8121 138.378L0 4.73914e-05L62.8797 0L106.371 76.1728L114.589 63.1513L76.93 4.73914e-05H140.385L183.726 77.3242L190.512 65.6143L165.986 24.3876L180.236 4.73914e-05H241.406L158.909 138.487L119.876 72.0967L81.8121 138.378Z"
              fill="white"
            />
          </g>
          <defs>
            <filter
              id="filter0_i_2550_896"
              x="0"
              y="0"
              width="241.406"
              height="138.487"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dx="-4" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.755744 0 0 0 0 0.79195 0 0 0 0 0.857121 0 0 0 1 0" />
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_2550_896" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>,
    {
      width: 1200,
      height: 600,
    },
  )
}
