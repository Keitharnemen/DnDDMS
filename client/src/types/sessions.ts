export default interface ISession {
    id: number,
    name: string,
    campaignId: number,
    startDate: Date,
    endDate: Date,
    plan: string,
    notes: string
}
