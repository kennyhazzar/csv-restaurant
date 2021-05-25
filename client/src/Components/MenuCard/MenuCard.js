import React from 'react'

export const MenuCard = ({ menu }) => {
    // console.log(`menu - ${JSON.stringify(menu)}`)
    // {menu.title}
    const showTitles = () => {
        for (let i in menu.sheetArray) return i
    }
    menu.sheetArray[0][Object.keys(...menu.sheetArray)[0]].map(item => console.log(item[0]))
    return (
        <div className="container">
            <div className="row">
                <div className="section">
                    <h1 className="col s12">{menu.title}</h1>
                </div>
                <div className="section">
                    <h2 className="col s12">{Object.keys(...menu.sheetArray)[0]}</h2>
                </div>
                <div className="section">
                    {menu.sheetArray[0][Object.keys(...menu.sheetArray)[0]].map(item =>
                        <div>
                            <p className="">{item[0]}</p>
                            <p className="">{item[3]}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}