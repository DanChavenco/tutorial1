import { NextPage } from 'next';
import Link from 'next/link';

// const links = [
//   { href: 'https://github.com/vercel/next.js', label: 'GitHub' },
//   { href: 'https://nextjs.org/docs', label: 'Docs' },
// ]

const Nav: NextPage = () => {
  return (
    <nav>
      <ul className="flex items-center justify-between p-8">
        <li>
          <Link href="/">
            <a className="text-blue-500 no-underline text-accent-1 dark:text-blue-300">
              TEACH OTHER
            </a>
          </Link>
        </li>
        <ul className="flex items-center justify-between space-x-4">
          <li>
            <Link href="/profile">
              <a className="no-underline btn-blue">
                Profile
              </a>
            </Link>
          </li>
          <li>
            <Link href="/search">
              <a className="no-underline btn-blue">
                Search
              </a>
            </Link>
          </li>
        </ul>
      </ul>
    </nav>
  )
}

export default Nav;


/*
{links.map(({ href, label }) => (
  <li key={`${href}${label}`}>
    <a href={href} className="no-underline btn-blue">
      {label}
    </a>
  </li>
))}
*/