import IClasses from "../types/classes";

interface PrevHPArgs {
    level: number;
    constitution: number;
    classID: number;
  }

  //funkcja liczenia punktów życia przy zmianach niektórych atrybutów
  export const calculateHP = (
    level: number,
    constitution: number,
    classId: number,
    prevHP: number,
    classes: IClasses[],
    prevHPArgs: PrevHPArgs,
  ) => {
    let HP = prevHP;
    const constitutionMOD =
      Math.floor(constitution / 2) - 5 >= 0
        ? Math.floor(constitution / 2) - 5
        : 0;
    const prevConstitutionMOD =
      Math.floor(prevHPArgs.constitution / 2) - 5 >= 0
        ? Math.floor(prevHPArgs.constitution / 2) - 5
        : 0;
    const cls = classes.find((cls) => cls.id === classId) || {
      id: 0,
      name: "",
      cube: 0,
    };

    if (level > prevHPArgs.level) {
      HP += Math.floor(Math.random() * cls!.cube + 1) + constitutionMOD;
    } else if (constitutionMOD !== prevConstitutionMOD) {
      HP += level;
    } else {
      HP = cls!.cube + constitutionMOD;
    }

    return HP;
  };