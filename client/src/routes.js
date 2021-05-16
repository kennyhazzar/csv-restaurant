import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { DetailPage } from './pages/DetailPage'
import { GeneratePage } from './pages/GeneratePage'
import { idPage } from './pages/idPage'
import { MenusPage } from './pages/MenusPage'
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
            <Route path='/menu/details' exact>
                <DetailPage />
            </Route>
            <Redirect to="/generate" />
        </Switch>
    )
}