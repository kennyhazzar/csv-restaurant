import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export const GeneratePage = () => {
    const [file, setFile] = useState(null)
    const [code, setCode] = useState(null)
    const [redirect, setRedirect] = useState(false)
    let history = useHistory()

    const UploadHandler = async () => {
        try {
            const formData = new FormData()
            formData.append('name', file.name)
            formData.append('file', file)
            const data = await axios.post("api/generate", formData, {
                headers: { "Access-Control-Allow-Origin": "*" }
            })
            console.log(`link ${JSON.stringify(data.data.code)}`)
            setCode(data.data.code)
            setRedirect(true)
        } catch (error) { console.log(error) }
    }

    useEffect(() => { if (redirect) history.push(`/menu/${code}`) }, [redirect])

    return (
        <div
            style={{
                display: "flex",
                padding: '1em',
                justifyContent: 'center',
                flexDirection: 'column'
            }}>
            <form>
                <div className='flex' style={{padding: '1em'}}>
                    <input type='file' id='file' accept='.csv' onChange={event => {
                        const file = event.target.files[0]
                        setFile(file)
                    }} />
                </div>
            </form>
            <button onClick={UploadHandler}>Создать</button>
        </div>
    )
}