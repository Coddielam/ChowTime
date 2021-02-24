import './menuIndividual.scss';

const MenuIndividual = () => {

    const dummyData = [
        {
            'id': 'T1',
            'name': '吉列虎蝦配野菜忌廉汁 配日式炸餃子, 三文魚飯團',
            'price': '68',
        },
        {
            'id': 'T2',
            'name': '鹽燒鯖魚配吉列南瓜薯餅',
            'price': '68',
        }
    ]

    return (
        <>
        <div className="individual-menu-container">
            <h2>Restaurant Name</h2>            
            {
                dummyData.map(item => (
                    <div className="menu-item-container" key={item.id}>
                        <span>{item.id}</span>
                        <span>{item.name}</span>
                        <span>${item.price}</span>
                    </div>
                ))
            }
        </div>
        </>
    )
}

export default MenuIndividual;