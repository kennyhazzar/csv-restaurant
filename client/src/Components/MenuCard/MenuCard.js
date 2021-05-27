import React from 'react'
import "../MenuCard/MenuCard.css"
export const MenuCard = ({ menu, error }) => {
    // console.log(`menu - ${JSON.stringify(menu)}`)
    // {menu.title}
    console.log(`error - ${error}`)
    const showTitles = () => {
        for (let i in menu.sheetArray) return i
    }
    menu.sheetArray[0][Object.keys(...menu.sheetArray)[0]].map(item => console.log(item[0]))
    return (
        <>
            <>{error && <div><p>Ошибка 404 - Меню не существует</p></div>}</>
            <>{!error && <div className="container">
                <div className="row" style={{width: '600px'}}>
                    <div
                        className="titles"
                        style={{
                            display: 'flex',
                            // justifyContent: 'flex-start',
                            alignContent: 'flex-start',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            // backgroundColor: '#B6FCD5',
                            padding: '1em'
                        }}>
                        <div className="section">
                            <h1 className="col s12"
                            style={{justifySelf: 'center'}}
                            >
                                {menu.title}
                            </h1>
                        </div>
                        <div className="section">
                            <h2 className="col s12"
                            // style={{
                            //     display: 'flex',
                            //     justifyContent: 'flex-start'
                            // }}
                            >{Object.keys(...menu.sheetArray)[0]}</h2>
                        </div>
                        <div className="section">
                            {menu.sheetArray[0][Object.keys(...menu.sheetArray)[0]].map(item =>
                                <div className="section-case">
                                    <div className="case">
                                        <p><strong>{item[0]}</strong></p>
                                        <p><strong>{item[3]}</strong></p>
                                    </div>
                                    <p>{item[2]},&nbsp;{item[1]}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>}</>
        </>
    )
}