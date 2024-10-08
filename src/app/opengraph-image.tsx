/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og"

export const runtime = "edge"

export default function GET() {
  return new ImageResponse(
    (
      <div tw="flex items-center justify-center w-full h-full bg-black text-white">
        <div tw="absolute inset-0 flex w-full h-full">
          <img style={{ opacity: 0.03 }} src="https://tunnel.wouter.cloud/grain.png" width={1200} height={600} alt="" />
        </div>
        <div tw="absolute inset-0 flex w-full h-full">
          <img style={{ opacity: 0.3 }} src="https://tunnel.wouter.cloud/rays.png" width={1200} height={600} alt="" />
        </div>
        <svg width="232" height="168" viewBox="0 0 58 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_f_225_160)">
            <path
              d="M22.9138 31.82L10.1104 10.1641L19.9509 10.1641L26.7572 22.085L28.0433 20.0471L22.1498 10.1641H32.0805L38.8632 22.2652L39.9252 20.4326L36.0869 13.9807L38.317 10.1641H47.89L34.9794 31.837L28.8708 21.4471L22.9138 31.82Z"
              fill="white"
            />
          </g>
          <g filter="url(#filter1_i_225_160)">
            <path
              d="M22.9138 31.82L10.1104 10.1641L19.9509 10.1641L26.7572 22.085L28.0433 20.0471L22.1498 10.1641H32.0805L38.8632 22.2652L39.9252 20.4326L36.0869 13.9807L38.317 10.1641H47.89L34.9794 31.837L28.8708 21.4471L22.9138 31.82Z"
              fill="white"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_225_160"
              x="0.110352"
              y="0.164062"
              width="57.7798"
              height="41.6729"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation={1} result="effect1_foregroundBlur_225_160" />
            </filter>
            <filter
              id="filter1_i_225_160"
              x="10.1104"
              y="10.1641"
              width="37.7798"
              height="25.6729"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              {/* <feOffset dy="4" /> */}
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_225_160" />
            </filter>
          </defs>
        </svg>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    },
  )
}
