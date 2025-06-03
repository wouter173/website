import { ImageResponse } from 'next/og'
import { CONSTANTS } from './constants'

export const contentType = 'image/png'
export const dynamic = 'force-static'

export default function GET() {
  return new ImageResponse(
    (
      <div tw="flex items-center justify-center w-full h-full bg-white text-neutral-600">
        <div tw="absolute inset-0 flex w-full h-full">
          <img style={{ opacity: 0.5 }} src={`${CONSTANTS.canonicalUrl}/grain.png`} width={1200} height={600} alt="" />
        </div>
        <div tw="flex flex-col gap-4 items-center justify-center">
          <svg width="180" height="112" viewBox="0 0 45 28" xmlns="http://www.w3.org/2000/svg" fill="#28292a">
            <path d="M16.4136 24.82L3.61011 3.16406L13.4507 3.16406L20.257 15.085L21.5431 13.0471L15.6495 3.16406H25.5802L32.363 15.2652L33.4249 13.4326L29.5866 6.98069L31.8168 3.16406H41.3898L28.4791 24.837L22.3706 14.4471L16.4136 24.82Z" />
          </svg>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    },
  )
}
