export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto max-w-4xl">{children}</div>
    </div>
  )
}
