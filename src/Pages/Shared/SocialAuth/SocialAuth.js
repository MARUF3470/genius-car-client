import { contains } from '@firebase/util';
import React, { useContext } from 'react';
import { setAuthToken } from '../../../api/auth';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const SocialAuth = () => {
    const { googleSignIn } = useContext(AuthContext)
    const hangleGoogle = () => {
        googleSignIn()
            .then(res => {
                const user = res.user
                setAuthToken(user)
            })
            .catch(err => console.error(err))
    }
    return (
        <div className='text-center'>
            <button onClick={hangleGoogle} className='btn btn-ghost'>Google</button>
        </div>
    );
};

export default SocialAuth;