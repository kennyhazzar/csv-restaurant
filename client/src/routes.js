import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { GeneratePage } from './pages/GeneratePage'
import { IdPage } from './pages/IdPage'
import { MenusPage } from './pages/MenusPage'
import { RulesPage } from './pages/RulesPage'
export const useRoutes = () => {
    return (
        <Switch>
            <Route path='/generate' exact>
                <GeneratePage />
            </Route>
            <Route path='/menu/:code' exact>
                <IdPage />
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