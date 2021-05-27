import React from 'react'
import "../MenuCard/MenuCard.css"
var _this = this;
export const MenuCard = ({ menu, error }) => {
    // console.log(`menu - ${JSON.stringify(menu)}`)
    // {menu.title}
    console.log(error)
    // menu.sheetArray[0][Object.keys(...menu.sheetArray)[0]].map(item => console.log(item[0]))
    return (
        <>
            {error && <div><h1>Ошибка 404 - Меню не существует</h1></div>}
            {
                !error && <div className="row">
                    <div className="section">
                        <h1 className="col s12"
                            style={{ justifySelf: 'center' }}
                        >
                            {menu.title}
                        </h1>
                    </div>
                    {menu.sheetArray.map((item, index) => {
                        for (var subTitle in menu.sheetArray[index])
                            return (<div className="container">
                                <div>
                                    <div
                                        className="titles"
                                        style={{
                                            display: 'flex',
                                            // justifyContent: 'flex-start',
                                            alignContent: 'flex-start',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            // backgroundColor: '#B6FCD5',
                                            padding: '1em',
                                            width: 600
                                        }}>
                                        <div className="section">
                                            <h2 className="col s12"
                                            // style={{
                                            //     display: 'flex',
                                            //     justifyContent: 'flex-start'
                                            // }}
                                            >{subTitle}</h2>
                                        </div>
                                        <div className="section"
                                        style={{
                                            padding: '2em'
                                        }}                                        
                                        >
                                            {item[subTitle].map(subItem => {
                                                return <div className="section-case">
                                                    <div className="case">
                                                        <p><strong>{subItem[0]}</strong></p>
                                                        <p><strong>{subItem[3]}</strong></p>
                                                    </div>
                                                    <p>{subItem[2]},&nbsp;{subItem[1]}</p>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>)
                    })}
                </div>
            }
        </>
    )
}