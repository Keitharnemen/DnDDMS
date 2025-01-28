export default interface IUser {
    id: number,
    name: string,
    surname: string,
    login: string,
    password: string,
    isAdmin: boolean,
    isMaster: boolean
}