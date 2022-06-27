import axios from 'axios'
import Link from 'next/link'

const Header = () => {

  const logout = async () => {
    await axios.post('/api/logout', {})
  }

  return (
    <div className="p-8 shadow-lg">
      <nav className="container flex flex-row items-center justify-between mx-auto">
        <h1 className="text-2xl font-bold">Hello Universe</h1>
        <ul className="inline-flex space-x-4">
          <li className="hover:underline">
            <Link href="/" passHref>
              <a>Home</a>
            </Link>
          </li>
          <li className="hover:underline">
            <Link href="/about" passHref>
              <a>About</a>
            </Link>
          </li>
          <li className="hover:underline">
            <Link href="/contact" passHref>
              <a>Contact</a>
            </Link>
          </li>
          <li className="cursor-pointer hover:underline">
            <Link href="/login" passHref>
              <a>Login</a>
            </Link>
          </li>
          <li className="cursor-pointer hover:underline">
            <a onClick={logout}>Logout</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header
