// export const addLoggedUserToLocalStorage = (user) => {
//     localStorage.setItem('user', JSON.stringify(user))
// }

export const removeUserFromLocalStorage = () => {
    localStorage.removeItem('userData');
}

export const getLoggedUserFromLocalStorage = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if(userData.user.uid) {
        return userData.user;
    } else {
        return null;
    }
}
