import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const NavBarLink = () => {
  const { isAuthenticated, setIsAuthenticated, username } = useContext(AuthContext);

  function logout(){
    localStorage.removeItem("access");
    localStorage.removeItem("cart_code");
    setIsAuthenticated(false);
  }

  return (
    <ul className="navbar-nav ms-auto mb-2 mb-1g-0">
      {isAuthenticated ? (
        <>
          <li className="nav-item">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active fw-semibold"
                  : "nav-link fw-semibold"
              }
              end
            >
              Hi, {username}
            </NavLink>
          </li>

          <li className="nav-item" onClick={logout}>
            <NavLink
              to="/logout"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active fw-semibold"
                  : "nav-link fw-semibold"
              }
              end
            >
              Logout
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <li className="nav-item">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active fw-semibold"
                  : "nav-link fw-semibold"
              }
              end
            >
              Login
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active fw-semibold"
                  : "nav-link fw-semibold"
              }
              end
            >
              Register
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavBarLink;

// import { Link } from "react-router-dom";

// const NavBarLink = () => {
//   return (
//     <ul className="navbar-nav ms-auto mb-2 mb-1g-0">
//       <li className="nav-item">
//         <a className="nav-link active fw-semibold" href="#!">
//           Home
//         </a>
//       </li>
//       <li className="nav-item">
//         <Link to="/profile" className="nav-link fw-semibold" href="#!">
//           Shop
//         </Link>
//       </li>
//       <li className="nav-item">
//         <a className="nav-link fw-semibold" href="#!">
//           About
//         </a>
//       </li>
//       <li className="nav-item">
//         <a className="nav-link fw-semibold" href="#!">
//           Contact
//         </a>
//       </li>
//     </ul>
//   );
// };

// export default NavBarLink;
