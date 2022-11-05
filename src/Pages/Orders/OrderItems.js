import React, { useEffect, useState } from 'react';

const OrderItems = ({ order, handleDelete, handleUpdate }) => {
    const { price, customer, serviceName, phone, service, message, _id, status } = order
    // console.log(_id)
    const [orderService, setOrderService] = useState({})
    useEffect(() => {
        fetch(`https://genius-car-server-nine-psi.vercel.app/services/${service}`)
            .then(res => res.json())
            .then(data => setOrderService(data))
    }, [service])

    return (
        <tr>
            <th>
                <button onClick={() => handleDelete(_id)} className='btn btn-ghost btn-circle'>x</button>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="rounded w-20 h-20">
                            {
                                orderService?.img && <img src={orderService.img} alt="Avatar Tailwind CSS Component" />
                            }
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{customer}</div>
                        <div className="text-sm opacity-50">{phone}</div>
                    </div>
                </div>
            </td>
            <td>
                {serviceName}
                <br />
                <span className="badge badge-ghost badge-sm">${price}</span>
            </td>
            <td>Blue</td>
            <th>
                <button className="btn btn-ghost btn-xs">{message}</button>
            </th>
            <th>
                <button className="btn btn-ghost btn-xs" onClick={() => handleUpdate(_id)}>{status ? status : 'pending'}</button>
            </th>
        </tr>
    );
};

export default OrderItems;