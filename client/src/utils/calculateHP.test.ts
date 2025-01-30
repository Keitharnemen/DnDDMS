import { calculateHP } from "./calculateHP";

describe('calculateHP', () => {
    const classes = [
        {id: 1, name: 'Barbarzyńca', cube: 12},
        {id: 2, name: 'Czarownik', cube: 4}
    ]

        test("Nowa postać", () => {
            const HP = calculateHP(1, 8, 1, 0, classes, {level: 1, constitution: 8, classID: 0})
            expect(HP).toBe(12)
        })

        test("Zmiana klasy", () => {
            const HP = calculateHP(1, 8, 2, 12, classes, {level: 1, constitution: 8, classID: 1})
            expect(HP).toBe(4)
        })

        test("Awans postaci", () => {
            const HP = calculateHP(2, 8, 1, 12, classes, {level: 1, constitution: 8, classID: 1})
            expect(HP).toBeGreaterThan(13)
            expect(HP).toBeLessThan(24)
        })

        test("Dodanie kondycji - zmiana modyfikatora", () => {
            const HP = calculateHP(1, 12, 1, 12, classes, {level: 1, constitution: 8, classID: 1})
            expect(HP).toBe(13)
        })

        test("Dodanie kondycji - bez zmiany modyfikatora", () => {
            const HP = calculateHP(1, 9, 1, 12, classes, {level: 1, constitution: 8, classID: 1})
            expect(HP).toBe(12)
        })


        test("Zmiana modyfikatora przy poziomie wyższym niż 1", () => {
            const HP = calculateHP(3, 12, 1, 36, classes, {level: 3, constitution: 8, classID: 1})
            expect(HP).toBe(39)
        })

})