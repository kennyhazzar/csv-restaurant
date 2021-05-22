import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import GeneratePage from './pages/GeneratePage'
// import { GeneratePage } from './pages/GeneratePage'
import { idPage } from './pages/IdPage'
import { MenusPage } from './pages/MenusPage'
import { RulesPage } from './pages/RulesPage'
export const useRoutes = () => {
    return (
        <Switch>
            <Route path='/generate' exact>
                <GeneratePage />
            </Route>
            <Route path='/menu/:code' exact>
                <idPage />
            </Route>
            <Route path='/menu' exact>
                <MenusPage />
            </Route>
            <Route path='/rules' exact>
                <RulesPage />
            </Route>
            <Redirect to="/generate" />
        </Switch>
    )
}