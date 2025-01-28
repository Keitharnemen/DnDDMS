import Cookies from 'js-cookie'

export const checkRoles = () => {
    const rolesCookie = Cookies.get("roles");
    if (!rolesCookie) {
    return { isAdmin: false, isMaster: false };
    }
    return JSON.parse(rolesCookie)
}