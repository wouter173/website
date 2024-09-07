import { Tool } from "@/app/(home)/tools"
import { readFile } from "fs/promises"

export async function getTools() {
  const json = JSON.parse(await readFile("./content/tools.json", "utf-8")) as Tool[]
  return json
}
