"use client";

type NavbarProps = {
  cartCount: number;
  onCartClick: () => void;
};

export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
  return (
    <nav className="navbar" aria-label="Navegación principal">
      <a href="#" onClick={(e) => e.preventDefault()} className="nav-brand">
        The <span>Archive</span>
      </a>
      <ul className="nav-links" role="list">
        <li role="listitem"><a href="#legends">Legends</a></li>
        <li role="listitem"><a href="#finals">Eternal Finals</a></li>
        <li role="listitem"><a href="#numbers">Immortal Numbers</a></li>
        <li role="listitem"><a href="#history">Made History</a></li>
        <li role="listitem"><a href="#drops">Iconic Drops</a></li>
      </ul>
      <div className="nav-utils">
        <a href="#" onClick={(e) => e.preventDefault()}>Archive</a>
        <a href="#" onClick={(e) => e.preventDefault()}>About</a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onCartClick();
          }}
        >
          Cart ({cartCount})
        </a>
      </div>
    </nav>
  );
}
