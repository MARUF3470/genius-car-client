export const setAuthToken = (user) => {
    const currentUser = {
        email: user.email
    }
    fetch('https://genius-car-server-nine-psi.vercel.app/jwt', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            //local storage is easiest but not the best place to store the jwt token
            localStorage.setItem('genious-token', data.token)
            // navigate(from, { replace: true })
        })
}