import Link from "next/link";
import { useRouter } from 'next/router';

const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Adicionar",
    path: "/adicionar",
  },
];

function NavAnchor({ path, children }) {
  return (
    <Link href={path} legacyBehavior><a>{children}</a></Link>
  );
}

export default function Header() {
  const { pathname } = useRouter();

  return (
    <header>
      <nav>
        <Link href='/'>
          <h2>marketList</h2>
        </Link>
        <ul>
          {links.map(({ name, path }) => (
            <li key={path}>
              {path === pathname ? (
                <span>{name}</span>
              ) : (
                  <NavAnchor path={path}>{name}</NavAnchor>
              )}
            </li>
          ))}
        </ul>
        <p>perfil</p>
      </nav>
    </header>
  );
}
