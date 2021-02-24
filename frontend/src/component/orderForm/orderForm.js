import { useEffect, useState } from 'react';
import axios from 'axios';
import SocketIOClient from 'socket.io-client'

import './OrderForm.scss';

const OrderForm = () => {

    const [jsonData, setJsonData] = useState(null);
    const [chosenRestaurant, setChosenRestaurant] = useState(null);

    useEffect(() => {
        fetch("http://localhost:6969/menu")
            .then(res => res.json())
            .then(res => {
                setJsonData(res);
            })
            .catch(err => console.log(err));
    }, []);

    // dummy data
    const dummyRestaurantData = [
        {
            'id': '0',
            'restaurant': '韓家',
            'address': '',
            'orderMethod': {
                'type': 'whatsapp',
                'link': 'https://wa.me/85251743398',
                'phoneNo': '',
            },
            'courses': [
                {
                    id: '0',
                    name: '麻醬沙律',
                    price: 35,
                },
                {
                    id: '1',
                    name: '雜菜煎餅',
                    price: 38,
                },
            ],
            'additional_charges': {
                'special_drinks': 0,
                'cold': 2,
                'takeout_related': 2, 
            },
            'discount': 0.8,
        },
        {
            'id': '1',
            'restaurant': '龍鳳號',
            'address': '',
            'orderMethod': {
                'type': 'call',
                'link': '',
                'phoneNo': '23500608',
            },
            'courses': [
                {
                    id: '0',
                    name: '蔥油麵，迷你素叉燒包',
                    price: 52,
                },
                {
                    id: '1',
                    name: '紫菜檸香素魚',
                    price: 68,
                },
            ],
            'additional_charges': {
                'special_drinks': 0,
                'cold': 2,
                'takeout_related': 2, 
            },
            'discount': 0.85,
        },
    ]

    const [dummyOrders, setDummyOrders] = useState([
        {
            'name': 'Leon',
            'order': {
                'number': '1',
                'additional': '',
            }
        },
        {
            'name': 'Eddie',
            'order': {
                'number': '1',
                'additional': '',
            }
        },
    ])

    const [localOrderCopies, setLocalOrderCopies] = useState(null);
    useEffect(() => {
        setLocalOrderCopies(dummyOrders);
    }, [dummyOrders]);

    function orderHandler(e) {
        console.log(e.target);
        console.log(e.target.value);
    }

    const nameList = [
        '',
        'Leon',
        'Eddie',
        'Sunny',
        'Michael'
    ]

    const changeHandler = (e) => {
        // let restaurant = jsonData && jsonData.find(restaurant => restaurant.menu == chosenRestaurant);
        let restaurant = dummyRestaurantData.find(restaurant => restaurant.id === e.target.value);
        setChosenRestaurant(restaurant);
    }

    const addOrder = () => {
        let newOrders = dummyOrders
        newOrders.push({
            'name': '',
            'order': {
                'number': '',
                'additional': '',
            }
        })
        setDummyOrders(newOrders);
    }

    // Post Test
    const postData = (req) => {
        axios.post('http://localhost:6969/postTest', req)
            .then(() => {console.log('post called')})
            .catch(err => {console.log(err)});
    }
    useEffect(() => {
        const postDummy = {
            'menu': '4',
            'restaurant': '珠記冰室',
            'address': '',
            'courses': [
                {
                    id: '0',
                    name: '蒜蓉汁生炸雞髀',
                    price: 50,
                },
                {
                    id: '1',
                    name: '咖哩牛肉',
                    price: 52,
                },
            ]
        }
        // postData(postDummy);
    }, [])

    // Put Test
    const putData = () => {
        console.log('put fired from frontend');
        const putDummy = {
            'restaurant': 'My Boat',
        }
        axios.put('http://localhost:6969/menu', putDummy)
            .then(() => {console.log('put called')})
            .catch(err => {console.log(err)});
    }

    // Event emitter
    useEffect(() => {
        const socket = SocketIOClient('http://localhost:6969/');
        socket.on('message', (o) => {
            console.log('updated: ', o);
        })
    }, []);

    return (
        <>
        <div className="container">
            <div className="form-container">
                <div className="form-actions-header">
                    <select onChange={changeHandler}>
                        <option value=''>Choose Restaurant</option>
                        {dummyRestaurantData.map(item => (
                            <option key={item.id} value={item.id}>{item.restaurant}</option>
                        ))}
                    </select>
                    <button onClick={addOrder}>Add Order</button>
                    <button onClick={putData}>Test put triggered socket</button>
                </div>
                <div className="form-body">
                    {localOrderCopies && localOrderCopies.map((item, index) => {
                        let dish = chosenRestaurant ? chosenRestaurant.courses.find(menuItem => menuItem.id === item.order.number) : '';
                        return (
                            <div className="individual-form-container" key={index}>
                                <span>
                                    <select defaultValue={item.name}>
                                        {nameList.map(name => (
                                            <option key={name} value={name}>{name}</option>
                                        ))}
                                    </select>
                                </span>
                                <span>
                                    <select id={'dish-selection-' + index} onChange={orderHandler}>
                                        {chosenRestaurant && chosenRestaurant.courses.map(dish => (
                                            <option key={dish.id} value={dish.id}>{dish.id}</option>
                                        ))}
                                    </select>
                                </span>
                                <span>{dish && dish.name}</span>
                                <span>
                                    <input placeholder="Additional"></input>
                                </span>
                                <span>${dish && dish.price}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        </>
    )
}

export default OrderForm;