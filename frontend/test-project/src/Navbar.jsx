import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#e3f2fd' }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active"  to="/">메인</Link>
            </li>
            <li className="nav-item">
              <Link Link className="nav-link active"  to="/product">생산관리</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active"  to="/condition">공정관리</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;