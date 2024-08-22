"use client"
import { motion, useAnimationControls } from "framer-motion"
import React from "react"
// import useMeasure from "react-use-measure"

export const Tools = () => {
  // const [ref, { width }] = useMeasure()

  const controls = useAnimationControls()

  // useEffect(() => {
  //   const finalXPos = -width / 2

  //   controls.start({
  //     x: [0, finalXPos],
  //     transition: {
  //       ease: "linear",
  //       duration: 10,
  //       repeat: Infinity,
  //       repeatType: "loop",
  //       repeatDelay: 0,
  //     },
  //   })

  //   return () => {
  //     controls.stop()
  //   }
  // }, [width, controls])

  // overflow-hidden [mask:linear-gradient(to_right,rgba(255,255,255,0)_0%,rgba(255,255,255,1)_12.5%,rgba(255,255,255,1)_87.5%,rgba(255,255,255,0)_100%)]

  return (
    <div className="relative mx-auto w-full max-w-5xl ">
      <motion.ul
        drag="x"
        dragElastic={0.2}
        dragTransition={{ bounceDamping: 18 }}
        className="flex w-full gap-3"
        // ref={ref}
        animate={controls}
        onDragEnd={(e) => {
          console.log(e)
        }}
        onDrag={(e) => {
          // console.log(e.clientX)
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((x) => (
          <React.Fragment key={x}>
            <div className="flex flex-col gap-3">
              <div className="size-14 rounded-xl border border-[#1F1F1F] bg-[#0A0A0B] shadow-sm"></div>
              <div className="size-14 rounded-xl border border-[#1F1F1F] bg-[#0A0A0B] shadow-sm"></div>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <div className="size-14 rounded-xl border border-[#1F1F1F] bg-[#0A0A0B] shadow-sm"></div>
              <div className="size-14 rounded-xl border border-[#1F1F1F] bg-[#0A0A0B] shadow-sm"></div>
            </div>
            <div className="mt-1 flex flex-col gap-3">
              <div className="size-14 rounded-xl border border-[#1F1F1F] bg-[#0A0A0B] shadow-sm"></div>
              <div className="size-14 rounded-xl border border-[#1F1F1F] bg-[#0A0A0B] shadow-sm"></div>
            </div>
            <div className="mt-5 flex flex-col gap-3">
              <div className="size-14 rounded-xl border border-[#1F1F1F] bg-[#0A0A0B] shadow-sm"></div>
              <div className="size-14 rounded-xl border border-[#1F1F1F] bg-[#0A0A0B] shadow-sm"></div>
            </div>
          </React.Fragment>
        ))}
      </motion.ul>
    </div>
  )
}
