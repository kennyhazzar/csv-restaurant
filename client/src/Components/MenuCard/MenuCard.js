import React from 'react'
import "../MenuCard/MenuCard.css"
export const MenuCard = ({ menu, error }) => {
    // console.log(`menu - ${JSON.stringify(menu)}`)
    // {menu.title}
    console.log(error)
    const showTitles = () => {
        for (let i in menu.sheetArray) return i
    }
    menu.sheetArray[0][Object.keys(...menu.sheetArray)[0]].map(item => console.log(item[0]))
    return (
        <>
            <>{error && <div><p>Ошибка 404 - Меню не существует</p></div>}</>
            <>{!error && <div className="container">
                <div className="row">
                    <div className="titles" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: "100%",
                        flexDirection: 'column'
                    }}>
                        <div className="section">
                            <h1 className="col s12">
                                {menu.title}
                            </h1>
                        </div>
                        <div className="section">
                            <h2 className="col s12">{Object.keys(...menu.sheetArray)[0]}</h2>
                        </div>
                    </div>
                    <div className="section">
                        {menu.sheetArray[0][Object.keys(...menu.sheetArray)[0]].map(item =>
                            <div>
                                <div className="case">
                                    <p>{item[0]}</p>
                                    <p>{item[3]}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>}</>
        </>
    )
}