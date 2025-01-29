import Cookies from 'js-cookie'


//dodatkowa funkcja sprawdzająca, jakie role ma użytkownik (użyto ciastek, bo to mało tajna informacja)
export const checkRoles = () => {
    const rolesCookie = Cookies.get("roles");
    if (!rolesCookie) {
    return { isAdmin: false, isMaster: false };
    }
    return JSON.parse(rolesCookie)
}