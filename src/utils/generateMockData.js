import { faker } from "@faker-js/faker";
import { createHash } from "./index.js";

export const generateMockUsers = async (quantity) => {
  const users = [];
  const hashedPassword = await createHash("coder123");

  for (let i = 0; i < quantity; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const role = faker.helpers.arrayElement(["user", "admin"]);

    const user = {
      first_name: firstName,
      last_name: lastName,
      email: faker.internet.email({
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        provider: faker.helpers.arrayElement([
          "gmail.com",
          "yahoo.com",
          "hotmail.com",
          "example.com",
        ]),
      }),
      password: hashedPassword,
      role: role,
      pets: [],
    };

    users.push(user);
  }

  return users;
};

export const generateMockPets = (quantity) => {
  const pets = [];

  for (let i = 0; i < quantity; i++) {
    const pet = {
      name: faker.animal.petName(),
      specie: faker.helpers.arrayElement([
        "Dog",
        "Cat",
        "Rabbit",
        "Bird",
        "Hamster",
        "Fish",
        "Turtle",
        "Guinea Pig",
        "Ferret",
        "Snake",
      ]),
      birthDate: faker.date.between({
        from: new Date("2018-01-01"),
        to: new Date("2024-12-31"),
      }),
      adopted: false,
      image: faker.image.url({
        width: 640,
        height: 480,
        category: "animals",
      }),
    };

    pets.push(pet);
  }

  return pets;
};
