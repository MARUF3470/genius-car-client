import React, { useContext, useEffect, useState } from 'react';
import { json } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import OrderItems from './OrderItems';

const Orders = () => {
    const { user, logOut } = useContext(AuthContext)
    const [orders, setOrders] = useState(null)
    useEffect(() => {
        fetch(`https://genius-car-server-nine-psi.vercel.app/orders?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('genious-token')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    logOut()
                }
                return res.json()
            })
            .then(data => setOrders(data))
    }, [user?.email, logOut])

    const handleDelete = id => {
        const pogress = window.confirm('Do you want to delete this item?')
        if (pogress) {
            fetch(`https://genius-car-server-nine-psi.vercel.app/orders/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('genious-token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        alert('Delete successfully')
                    }
                    const remainingItem = orders.filter(order => order._id !== id)
                    setOrders(remainingItem)
                })
        }
    }
    const handleUpdate = id => {
        fetch(`https://genius-car-server-nine-psi.vercel.app/orders/${id}`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('genious-token')}`
            },
            body: JSON.stringify({ status: 'Approved' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    const remainning = orders.filter(odr => odr._id !== id)
                    const approved = orders.find(odr => odr._id === id)
                    approved.status = 'Approved';
                    const newOrder = [approved, ...remainning]
                    setOrders(newOrder)
                }
            })
    }
    return (
        <div>
            <h1>total order{orders?.length}</h1>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                <button className='btn btn-circle btn-ghost'>x</button>
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th>Details</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders && orders.map(order => <OrderItems key={order._id} order={order} handleDelete={handleDelete} handleUpdate={handleUpdate}></OrderItems>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;