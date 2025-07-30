import NextImage from 'next/image'

export const Image = ({ src, alt, bg, width, height }: { src: string; alt: string; bg: `#${number}`; width: number; height: number }) => {
  return (
    <div className="relative">
      <NextImage
        src={src}
        alt={alt}
        className="dark:bg-graphite block w-full overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-transparent"
        style={{ background: bg }}
        width={width}
        height={height}
      />
    </div>
  )
}
