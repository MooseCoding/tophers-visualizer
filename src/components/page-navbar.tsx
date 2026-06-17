'use client'

export function PageNavbar() {
  return (
    <header className="flex h-14 w-full items-center justify-between border-b border-zinc-800 bg-black px-4 text-white">
      {/* Left side: Logo and Title */}
      <div className="flex items-center gap-2">
        <img src="/logo_icon.svg" alt="Apex Pathing" className="mr-1 size-7" />
        <b className="text-lg tracking-tight">Apex Pathing</b>
      </div>

      {/* Right side: External Links */}
      <div className="flex items-center gap-4 text-sm font-medium text-zinc-400">
        <a
          href="https://github.com/ApexPathing"
          target="_blank"
          rel="noreferrer"
          className="hover:text-white transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://discord.gg/qpP4CXaHDg"
          target="_blank"
          rel="noreferrer"
          className="hover:text-white transition-colors"
        >
          Discord
        </a>
      </div>
    </header>
  )
}