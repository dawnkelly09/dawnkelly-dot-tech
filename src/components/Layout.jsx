import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import Terminal from './Terminal'

export default function Layout() {
  return (
    <div className="min-h-dvh flex flex-col max-w-3xl mx-auto">
      <Nav />
      <main className="flex-1 px-4 py-8 md:px-8">
        <Outlet />
      </main>
      <Terminal />
    </div>
  )
}
