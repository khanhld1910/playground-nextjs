import Link from 'next/link'

const Header = () => {
  return (
    <div className="shadow-lg p-8">
      <nav className="container mx-auto flex flex-row items-center justify-between">
        <h1 className="font-bold text-2xl">Hello Universe</h1>
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
        </ul>
      </nav>
    </div>
  )
}

export default Header
