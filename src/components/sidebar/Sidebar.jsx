import { DARK, useTheme } from '../../contexts/theme'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from 'contexts/Auth'

const Sidebar = ({ routes }) => {
  const { theme } = useTheme()
  const { user, toggleAuth } = useAuth()
  console.log(routes)
  //? i don't understand why we should use this
  //? i think navLink do it by itself
  // const activeRoute = (routeName) => {
  //   return props.location.pathname.indexOf(routeName) > -1 ? 'selected' : ''
  // }

  const isDark = theme.mode === DARK

  return (
    <aside
      className={`right-sidebar sidebar-${isDark ? 'dark' : 'light'}`}
      style={{
        color: 'white',
        backgroundImage:
          'linear-gradient( 109.6deg,  #2183c4 11.2%, rgba(111,137,212,1) 91.2% )',
      }}
      id="sidebarbg"
      data-sidebarbg="skin6"
    >
      <div className="sidebar-nav">
        <ul className="nav p-0" id="sidebar-nav">
          {routes
            .filter((route) => !route.redirect && route.showInNav)
            .map((route, index) => (
              <li
                className={
                  // activeRoute(route.path) +
                  //? there is not at all route.pro
                  // (route.pro ? ' active active-pro' : '') +
                  ' sidebar-item'
                }
                key={index}
              >
                <NavLink
                  to={route.path}
                  className="nav-link sidebar-link"
                  activeClassName="active"
                >
                  <i className={route.icon} />
                  <span className="hide-menu">{route.name}</span>
                </NavLink>
              </li>
            ))}
        </ul>
        <span className='btn btn-warning ms-4 mt-5' >
          {user.loggedIn
            ? <h4 onClick={toggleAuth} >logout</h4>
            : <Link to={'/login'}><h4>login</h4></Link>}
        </span>
      </div>
    </aside>
  )
}

export default Sidebar