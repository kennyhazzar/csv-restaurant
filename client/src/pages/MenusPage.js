import React from 'react'
import { useHttp } from '../hooks/http.hook'

export const MenusPage = () => {

    const { loading, error, request } = useHttp()

    const menusHandler = async () => {
        try {
            const data = await request('/api/menu/all')
            console.log(`Data ${JSON.stringify(data)}`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Последние меню, загруженные пользователями</h1>
            
        </div>
    )
}

