import Image from "next/image";
import cloudsSrc from "@/../public/clouds.png";
import { Nav } from "@/components/nav";

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <main className="relative flex h-[80vh] max-h-[1000px] min-h-[900px] w-full flex-col before:absolute before:inset-0 before:bg-[url('/grain.png')] before:bg-repeat">
        <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-t from-[#4D77BB] to-[#8FACC0] opacity-80">
          <Image fill alt="cloud background" src={cloudsSrc} className="object-cover object-center mix-blend-screen" />
        </div>

        <div className="relative z-20 mx-auto grid h-full max-w-4xl place-items-center">
          <h1 className=" text-6xl  font-extrabold leading-relaxed text-black opacity-70">Wouter de Bruijn</h1>
        </div>
      </main>
      <div className="h-screen bg-white"></div>
    </div>
  );
}
