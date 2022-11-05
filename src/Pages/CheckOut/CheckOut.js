import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const CheckOut = () => {
    const { title, _id, price } = useLoaderData()
    //  console.log(data)
    const { user } = useContext(AuthContext)
    const handleOrderSubmit = event => {
        event.preventDefault()
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`
        const email = form.email.value;
        const phone = form.phone.value;
        const message = form.message.value
        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message

        }
        fetch(`https://genius-car-server-nine-psi.vercel.app/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('genious-token')}`
            },
            body: JSON.stringify(order),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    alert('Order place succesfully')
                    form.reset()
                }
            })
    }
    return (
        <div>
            <h1 className='text-4xl'>{title}</h1>
            <p className='text-xl'>${price}</p>
            <form onSubmit={handleOrderSubmit}>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
                    <input type="text" name='firstName' placeholder="first name" className="input input-bordered w-full" />
                    <input type="text" name='lastName' placeholder="last name" className="input input-bordered w-full" />
                    <input type="text" name='phone' placeholder="phone" className="input input-bordered w-full" />
                    <input type="text" defaultValue={user?.email} readOnly name='email' placeholder="email" className="input input-bordered w-full" />
                </div>
                <div>
                    <textarea name='message' className="textarea textarea-bordered w-full mb-4" placeholder="message"></textarea>
                    <input className='btn w-full mb-4' type="submit" value="confirm order" />
                </div>
            </form>
        </div>
    );
}
export default CheckOut;