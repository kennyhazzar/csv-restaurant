import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'

export const GeneratePage = () => {
    let history = useHistory()
    const [file, setFile] = useState(null)
    const [code, setCode] = useState(null)
    useEffect(() => {
        if (code) {
            console.log("Redirect in useEffect")
            history.push(`menu/${code}`)
        } else console.log("no redirect")
    }, [code])
    const uploadHandler = async event => {
        try {
            const formData = new FormData()
            formData.append('name', file.name)
            formData.append('file', file)
            const data = await axios.post("/api/generate", formData, {
                headers: { "Access-Control-Allow-Origin": "*" }
            })
            console.log(`link ${JSON.stringify(data.data.code)}`)
            setCode(data.data.code)
            // return (
            //     <Redirect to={`http:/localhost:3000/menu/${data.data.code}`} />
            // )
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div>
            <form>
                <div className='flex'>
                    <input type='file' id='file' accept=".csv" onChange={event => {
                        const file = event.target.files[0]
                        setFile(file)
                    }} />
                </div>
            </form>
            <button onClick={uploadHandler}>Создать</button>

        </div>
    )
}