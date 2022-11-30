export const getInfo =()=>{
    let user = localStorage.getItem('users');
    user=(JSON.parse(user));
    return user;
}