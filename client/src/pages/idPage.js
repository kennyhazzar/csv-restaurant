import axios from 'axios'
import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { MenuCard } from '../Components/MenuCard/MenuCard'

export const IdPage = props => {
    const [menu, setMenu] = useState(null)
    const [loading, setLoading] = useState(false)
    const menuId = useParams().code
    console.log(menuId)
    const getMenu = useCallback(
        async () => {
            try {
                const data = await axios.get(`/menu/${menuId}`)
                console.log(data.data.menu.sheetArray)
                setMenu(data.data.menu)
                setLoading(true)
            } catch (error) {

            }
        },
        [menuId, axios],
    )

    useEffect(() => {
        getMenu()

    }, [getMenu])



    return (
        <> {loading && <MenuCard menu={menu} />}</>
    )
}