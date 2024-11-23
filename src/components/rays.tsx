"use client"

//@ts-ignore
import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
import { Mesh, PlaneGeometry, ShaderMaterial, Vector4 } from "three"
//@ts-ignore
import vertexShader from "@/shaders/vertex-shader.glsl"
//@ts-ignore
import fragmentShader from "@/shaders/fragment-shader.glsl"
import { motion } from "motion/react"

export const Rays = () => {
  const [ready, setReady] = useState(false)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: ready ? 0.15 : 0 }} className="h-full w-full">
      <Canvas
        onCreated={() => setReady(true)}
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
        <TextureMesh counter={ready ? 1 : 0} />
      </Canvas>
    </motion.div>
  )
}

const TextureMesh = ({ counter: key }: { counter: number }) => {
  const mesh = useRef<Mesh<PlaneGeometry, ShaderMaterial> | null>(null)

  //@ts-ignore
  useFrame(({ clock, gl }) => {
    if (mesh.current) {
      mesh.current.material.uniforms.u_mouse.value = [1, 1]
      mesh.current.material.uniforms.u_time.value = clock.elapsedTime

      let c = gl.domElement.getBoundingClientRect()
      mesh.current.material.uniforms.u_resolution.value = [c.width, c.height]
    }
  })

  return (
    <>
      {/* @ts-ignore */}
      <mesh ref={mesh} position={[0, 0, 0]} scale={1} rotation={[0, 0, 0]}>
        {/* @ts-ignore */}
        <planeGeometry args={[1024, 1024]} />
        {/* @ts-ignore */}
        <shaderMaterial
          key={key}
          fragmentShader={fragmentShader as string}
          vertexShader={vertexShader as string}
          uniforms={{
            u_colors: { value: [new Vector4(1, 1, 1, 1), new Vector4(0.6352941176470588, 0.6470588235294118, 0.792156862745098, 1)] },
            u_intensity: { value: 0.375 },
            u_rays: { value: 0.05 },
            u_reach: { value: 0.311 },
            u_time: { value: 0 },
            u_mouse: { value: [0, 0] },
            u_resolution: { value: [2048, 2048] },
          }}
        />
        {/* @ts-ignore */}
      </mesh>
    </>
  )
}
