"use client"
import { Canvas, useFrame } from "@react-three/fiber"
import { Mesh, PlaneGeometry, ShaderMaterial, Vector4 } from "three"

import { AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import Image from "next/image"
import { AtIcon } from "@/components/icons/at-icon"
import { ChevronRightIcon } from "@/components/icons/chevron-right-icon"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRef, useState } from "react"
//@ts-ignore
import fragmentShader from "@/shaders/fragment-shader.glsl"
//@ts-ignore
import vertexShader from "@/shaders/vertex-shader.glsl"
import { cn } from "@/lib/utils"

import raysSrc from "../../public/rays.png"
import { motion, useDragControls, useMotionTemplate } from "framer-motion"
import { flushSync } from "react-dom"

export default function Home() {
  const [canvasReady, setCanvasReady] = useState(false)

  return (
    <div className="min-h-screen w-full">
      <main className="relative flex h-[90vh] max-h-[1000px] min-h-[900px] w-full flex-col">
        <div className="absolute inset-0 h-full w-full">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: canvasReady ? 0.15 : 0 }} className="h-full w-full">
            <Canvas
              onCreated={() => setCanvasReady(true)}
              gl={{
                preserveDrawingBuffer: true,
                premultipliedAlpha: false,
                alpha: true,
                antialias: true,
                precision: "highp",
                powerPreference: "high-performance",
              }}
              resize={{ debounce: 0, scroll: false, offsetSize: true }}
              dpr={1}
              camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] }}
            >
              <TextureMesh />
            </Canvas>
          </motion.div>

          {/* <Image
            className={cn(
              "absolute inset-0 z-20 h-full w-full mix-blend-screen transition-opacity",
              canvasReady ? "opacity-0" : "opacity-15",
            )}
            src={raysSrc}
            alt="Rays texture"
            width={1024}
            height={1024}
          /> */}
        </div>

        {/* <div className="relative z-20 mx-auto grid h-full max-w-4xl place-items-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-6xl font-extrabold leading-relaxed text-black opacity-70">Wouter de Bruijn</h1>
            <div className="flex justify-center gap-2">
              <Button asChild size="rounded" className="flex w-min items-center gap-1">
                <a href="mailto:wouter@debruijn.dev">
                  <AtIcon className="size-3.5" />
                  Contact me
                </a>
              </Button>

              <Button asChild size="rounded" className="flex w-min items-center bg-slate-100 pr-1.5 text-black hover:bg-slate-100/80">
                <Link href="/blog">
                  Blog <ChevronRightIcon className="size-4 shrink-0" />
                </Link>
              </Button>
            </div>
          </div>
        </div> */}
      </main>

      {/* <div className="relative pb-24">
        <div className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-4">
          <article className="relative z-20 -mt-10 overflow-hidden rounded-lg px-6 py-6 shadow-sm">
            <div className="absolute inset-0 -z-10 bg-white [clip-path:polygon(0_0,calc(100%-32px)_0,100%_32px,100%_100%,0_100%)]" />
            <div className="absolute right-0 top-0 -z-10 size-8 rounded-bl-lg bg-white shadow-lg [clip-path:polygon(-100%_0%,0%_0%,100%_100%,100%_200%,-100%_200%)]" />
            <div className="flex flex-col gap-4 pr-8">
              <h2 className="text-2xl font-semibold">The Next.js cheatsheet</h2>
              <p className="text text-neutral-700">
                A compendium of all the lessons I&quot;ve learned using nextjs for last 4 years of my life
              </p>
            </div>
          </article>
          <article className="relative z-20 -mt-10 rounded-lg bg-white py-20 shadow-sm"></article>
        </div>
      </div> */}
    </div>
  )
}

const TextureMesh = () => {
  const mesh = useRef<Mesh<PlaneGeometry, ShaderMaterial> | null>(null)

  useFrame(({ clock, gl }) => {
    if (mesh.current) {
      mesh.current.material.uniforms.u_mouse.value = [0, 0]
      mesh.current.material.uniforms.u_time.value = clock.getElapsedTime()

      let c = gl.domElement.getBoundingClientRect()
      mesh.current.material.uniforms.u_resolution.value = [c.width, c.height]
    }
  })

  const uniforms = {
    u_colors: {
      value: [new Vector4(1, 1, 1, 1), new Vector4(0.6352941176470588, 0.6470588235294118, 0.792156862745098, 1)],
    },
    u_intensity: { value: 0.375 },
    u_rays: { value: 0.05 },
    u_reach: { value: 0.311 },
    u_time: { value: 0 },
    u_mouse: { value: [0, 0] },
    u_resolution: { value: [2048, 2048] },
  }

  return (
    <>
      <mesh ref={mesh} position={[0, 0, 0]} scale={1} rotation={[0, 0, 0]}>
        <planeGeometry args={[2048, 2048]} />
        <shaderMaterial
          fragmentShader={fragmentShader as string}
          vertexShader={vertexShader as string}
          uniforms={uniforms}
          wireframe={false}
          wireframeLinewidth={0}
          dithering={false}
          glslVersion={"100"}
        />
      </mesh>
    </>
  )
}
