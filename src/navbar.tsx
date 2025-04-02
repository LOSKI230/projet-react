const Navbar = () => {
    return (
      <nav className="navbar fixed-top navbar-expand-lg bg-black shadow-md w-full">
        <div className="container mx-auto">
          {/* Logo */}
          <a className="navbar-brand text-white font-bold text-xl" href="#">
            CryptoTracker 
          </a>
  
          {/* Bouton Toggle pour mobile */}
          <button
            className="navbar-toggler border-yellow-400"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
  
          {/* Menu */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link text-white hover:text-yellow-300" href="#">
                  Accueil
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white hover:text-yellow-300" href="#">
                  Marché
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white hover:text-yellow-300" href="#">
                  Cryptos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white hover:text-yellow-300" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  