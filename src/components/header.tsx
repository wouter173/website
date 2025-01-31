"use client"

import { motion } from "motion/react"
import { useState } from "react"

import Spline from "@splinetool/react-spline"

export const Header = () => {
  const [ready, setReady] = useState(false)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} className="h-full w-full">
      <Spline scene="https://prod.spline.design/oZIBhV52Gw5gMxtB/scene.splinecode" onLoad={() => setReady(true)} />
    </motion.div>
  )
}

// export const Header = () => {
// return (
/* <Canvas
        shadows
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
        <Scene />
        <OrbitControls />
        <Suspense>
          <Environment preset="city" />
        </Suspense>
        <EffectComposer>
          <N8AO halfRes color="black" aoRadius={2} intensity={1} aoSamples={6} denoiseSamples={4} />
          <Bloom mipmapBlur levels={7} intensity={0.2} />
          <SMAA />
        </EffectComposer>
      </Canvas> */
// )
// }

// const GradientMaterial = ({ bboMin, bboMax }: { bboMin: Vector3; bboMax: Vector3 }) => {
//   console.log(bboMin, bboMax)

//   const shader = useMemo(
//     () => ({
//       vertexShader: `
//       uniform vec3 bboxMin;
//       uniform vec3 bboxMax;

//       varying vec3 vUv;

//       void main() {
//         vUv.y = (position.y - bboxMin.y) / (bboxMax.y - bboxMin.y);
//         vUv.x = (position.x - bboxMin.x) / (bboxMax.x - bboxMin.x);
//         vUv.z = (position.z - bboxMin.z) / (bboxMax.z - bboxMin.z);
//         gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
//       }`,
//       fragmentShader: `
//       uniform vec3 color1;
//       uniform vec3 color2;

//       varying vec3 vUv;

//       void main() {
//         float factor = smoothstep(0.0, 0.7, (vUv.x * 0.5) + (vUv.y * 0.5));

//         gl_FragColor = vec4(mix(color1, color2, factor), 1.0);
//       }`,
//       uniforms: {
//         color1: {
//           value: new Color("white"),
//         },

//         color2: {
//           value: new Color("#37363A"),
//         },
//         bboxMin: { value: bboMin },
//         bboxMax: { value: bboMax },
//       },
//     }),
//     [bboMax, bboMin],
//   )

//   return <shaderMaterial attach="material" args={[shader]} />
// }

// export const Scene = () => {
//   const [geometry, setGeometry] = useState<ExtrudeGeometry>()
//   const [boundingBox, setBoundingBox] = useState<[Vector3, Vector3]>([new Vector3(), new Vector3()])
//   const lightRef = useRef<SpotLight>(null)
//   // const geometryRef = useRef<ConeGeometry>(null)
//   // useHelper(lightRef, SpotLightHelper)

//   useEffect(() => {
//     const loader = new SVGLoader()
//     const svgData = loader.parse(
//       `<svg width="38" height="22" viewBox="0 0 38 22" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12.8035 21.656L0 0L9.84058 -7.41668e-06L16.6469 11.9209L17.933 9.88308L12.0394 0H21.9701L28.7528 12.1011L29.8148 10.2685L25.9765 3.81662L28.2067 0H37.7797L24.869 21.673L18.7605 11.283L12.8035 21.656Z" fill="#28292A" />
//       </svg>`,
//     )

//     const shape = svgData.paths[0].toShapes(true)
//     const geometry = new ExtrudeGeometry(shape, { depth: 10, bevelEnabled: false })
//     geometry.center()
//     geometry.rotateX(Math.PI)
//     geometry.scale(0.05, 0.05, 0.05)
//     geometry.computeBoundingBox()
//     console.log(geometry.boundingBox)
//     setBoundingBox([geometry.boundingBox!.min, geometry.boundingBox!.max])
//     setGeometry(geometry)
//   }, [])

//   return (
//     <>
//       <ambientLight intensity={0.2} />
//       <spotLight
//         ref={lightRef}
//         position={[4.6, 8.5, 6.3]}
//         intensity={3}
//         color={"white"}
//         castShadow
//         angle={Math.PI / 2}
//         distance={1000}
//         decay={0}
//       />
//       <mesh geometry={geometry} position={[0, 0, 0.25]} receiveShadow>
//         {/* <meshStandardMaterial color="white" /> */}
//         {/* <coneGeometry computeBoundingBox ref={geometryRef} /> */}

//         {/* <meshBasicMaterial>
//         <GradientTexture
//           stops={[0, 1]} // As many stops as you want
//           colors={['aquamarine', 'hotpink']} // Colors need to match the number of stops
//           size={1024} // Size is optional, default = 1024
//          />
//     </meshBasicMaterial> */}
//         <GradientMaterial bboMax={boundingBox[0]} bboMin={boundingBox[1]} />
//         {/* <gradientMaterial
//           attach="material"
//           color1={new Color("white")}
//           color2={new Color("black")}
//           bboxMin={boundingBox[0]}
//           bboxMax={boundingBox[1]}
//           metalness={0.8} // Reflective metal-like effect
//           roughness={0.2} // Makes it glossy
//           envMapIntensity={1.5} // Boosts reflections
//         /> */}
//       </mesh>
//     </>
//   )
// }
