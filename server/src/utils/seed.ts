import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs";
import { RaceModel } from "../dbschemas/races";
import { ClassModel } from "../dbschemas/classes";
import { UserModel } from "../dbschemas/users";
import { seedStatusModel } from "../dbschemas/seedStatus";

// Funkcja seedująca dane
export const seedData = async () => {
  try {
    const isSeeded = await seedStatusModel.findOne({ isSeeded: true }).lean();
    if (isSeeded) {
      return;
    }

    const races = [
      {
        id: 1,
        name: "Człowiek",
        strength: 1,
        dexterity: 1,
        condition: 1,
        wisdom: 1,
        inteligence: 1,
        charisma: 1,
      },
      {
        id: 2,
        name: "Elf",
        strength: 0,
        dexterity: 2,
        condition: 0,
        wisdom: 0,
        inteligence: 0,
        charisma: 0,
      },
      {
        id: 3,
        name: "Krasnolud",
        strength: 0,
        dexterity: 0,
        condition: 2,
        wisdom: 0,
        inteligence: 0,
        charisma: 0,
      },
      {
        id: 4,
        name: "Niziołek",
        strength: 0,
        dexterity: 2,
        condition: 0,
        wisdom: 0,
        inteligence: 0,
        charisma: 0,
      },
      {
        id: 5,
        name: "Diabelstwo",
        strength: 0,
        dexterity: 0,
        condition: 0,
        wisdom: 0,
        inteligence: 1,
        charisma: 2,
      },
      {
        id: 6,
        name: "Drakon",
        strength: 2,
        dexterity: 0,
        condition: 0,
        wisdom: 0,
        inteligence: 0,
        charisma: 1,
      },
      {
        id: 7,
        name: "Gnom",
        strength: 0,
        dexterity: 0,
        condition: 0,
        wisdom: 0,
        inteligence: 2,
        charisma: 0,
      },
      {
        id: 8,
        name: "Półelf",
        strength: 0,
        dexterity: 1,
        condition: 1,
        wisdom: 0,
        inteligence: 0,
        charisma: 2,
      },
      {
        id: 9,
        name: "Półork",
        strength: 2,
        dexterity: 0,
        condition: 1,
        wisdom: 0,
        inteligence: 0,
        charisma: 0,
      },
    ];

    const classes = [
      {
        id: 1,
        name: "Barbarzyńca",
        cube: 12,
      },
      {
        id: 2,
        name: "Bard",
        cube: 6,
      },
      {
        id: 3,
        name: "Kapłan",
        cube: 8,
      },
      {
        id: 4,
        name: "Druid",
        cube: 8,
      },
      {
        id: 5,
        name: "Wojownik",
        cube: 10,
      },
      {
        id: 6,
        name: "Mnich",
        cube: 8,
      },
      {
        id: 7,
        name: "Paladyn",
        cube: 10,
      },
      {
        id: 8,
        name: "Łowca",
        cube: 10,
      },
      {
        id: 9,
        name: "Łotrzyk",
        cube: 8,
      },
      {
        id: 10,
        name: "Czarownik",
        cube: 4,
      },
      {
        id: 11,
        name: "Czarodziej",
        cube: 4,
      },
    ];

    const hPassword = await bcrypt.hash("Dragon1", 12);
    const user = {
      id: 1,
      name: "Woj",
      surname: "Cyb",
      login: "Wojcyb",
      password: hPassword,
      isAdmin: true,
      isMaster: true,
    };

    await Promise.all([
      RaceModel.insertMany(races),
      ClassModel.insertMany(classes),
      UserModel.create(user),
    ]);
    console.log("Dane dodanr do bazy!");

    await seedStatusModel.create({ isSeeded: true });
    console.log("Flaga statusu utworzona");
  } catch (error) {
    console.error("Błąd podczas seedowania danych:", error);
    process.exit(1);
  }
};
