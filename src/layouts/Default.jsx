import { Footer, Header, ProtectedRoute, Sidebar } from 'components'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import ListRoutes from 'routes/ListRoutes'

const DefaultLayout = () => {

  return (
    <div
      id="main-wrapper"
      data-layout="vertical"
      data-sidebartype="full"
      data-sidebar-position="fixed"
      data-header-position="fixed"
      data-boxed-layout="full"
    >
      <Header />

      <Sidebar routes={ListRoutes} />

      <div className="page-wrapper d-block">
        <div className="page-content container-fluid">
          <Switch>
            {ListRoutes.map((prop, key) => {
              console.log(prop)
              if (prop.redirect) {
                return <Redirect from={prop.path} to={prop.pathTo} key={key} />
              } else if (prop.private) {
                return <ProtectedRoute {...prop} key={key} />
              } else {
                return <Route {...prop} key={key} />
              }
            })}
          </Switch>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default DefaultLayout