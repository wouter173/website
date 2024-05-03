"use client";
// import Image from "next/image";
// import cloudsSrc from "@/../public/clouds.png";
import { useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Clouds, Cloud, Sky as SkyImpl, CameraControls } from "@react-three/drei";
import { MeshLambertMaterial, Vector3 } from "three";

import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "@/components/icons/chevron-right-icon";
import Link from "next/link";
import { AtIcon } from "@/components/icons/at-icon";
import { useRef, useState } from "react";

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <main className="relative flex h-[90vh] max-h-[1000px] min-h-[900px] w-full flex-col before:absolute before:inset-0 before:bg-[url('/grain.png')] before:bg-repeat before:opacity-0">
        <div className="absolute inset-0 -z-10 h-full w-full opacity-80">
          {/*bg-gradient-to-t from-[#8FACC0] to-[#385898] */}
          <Canvas camera={{ position: new Vector3(0, -20, 0), fov: 75 }}>
            <Sky />
          </Canvas>
          {/* <Image fill alt="cloud background" src={cloudsSrc} className="object-cover object-center mix-blend-screen" /> */}
        </div>

        <div className="relative z-20 mx-auto grid h-full max-w-4xl place-items-center">
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
        </div>
      </main>
      <div className="relative h-screen bg-white before:absolute before:inset-0 before:bg-[url('/grain.png')] before:bg-repeat">
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
      </div>
    </div>
  );
}

const Sky = () => {
  return (
    <>
      <SkyImpl sunPosition={new Vector3(-1, 1, 1)} inclination={0.1} />
      <ambientLight intensity={Math.PI / 1.5} color={"blue"} />
      <spotLight position={[10, -40, 0]} decay={0} distance={45} penumbra={1} intensity={100} />
      <spotLight position={[-10, -40, 0]} decay={0} distance={45} penumbra={1} intensity={100} color={"#FFFFFF"} />

      <Clouds limit={400} material={MeshLambertMaterial}>
        <Cloud seed={1} fade={0} speed={0.2} growth={4} segments={40} volume={6} opacity={0.6} bounds={[4, 3, 1]} color="white" />
        <Cloud seed={9} fade={20} position={[0, -1, 0]} speed={0.5} growth={4} volume={50} opacity={0.2} bounds={[6, 2, 1]} color="white" />
        <Cloud
          seed={12}
          fade={10}
          position={[-10, 0, -10]}
          speed={0.5}
          growth={4}
          volume={50}
          opacity={0.1}
          bounds={[6, 2, 1]}
          color="#8FACC0"
        />
        <Cloud
          seed={13}
          fade={30}
          position={[10, 0, -10]}
          speed={0.5}
          growth={4}
          volume={50}
          opacity={0.1}
          bounds={[6, 2, 1]}
          color="#8FACC0"
        />
      </Clouds>
    </>
  );
};
