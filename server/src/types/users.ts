export default interface IUser {
    id: number,
    googleId: string,
    name: string,
    surname: string,
    login: string,
    email: string,
    password: string,
    isAdmin: boolean,
    isMaster: boolean
}