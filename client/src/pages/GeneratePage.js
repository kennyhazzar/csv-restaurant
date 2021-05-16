import React from 'react'
import { useHttp } from '../hooks/http.hook.js'

export const GeneratePage = () => {
    const { request } = useHttp()

    const uploadHandler = async files => {
        try {
            // const data = await request('/api/generate', "POST")
            // console.log(`Data ${JSON.stringify(data)}`)
            const file = files[0]
            console.log(file)
            const formData = new FormData()
            formData.append('file', file)
            const data = await request('/api/generate', 'POST', file)
            console.log(`Data ${JSON.stringify(data)}`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Генератор меню для ресторанов</h1>
            <input type="file" onChange={e => uploadHandler(e.target.files)}>

            </input>
        </div>
    )
}