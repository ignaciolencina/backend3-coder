import { Router } from "express";
import {
  generateMockUsers,
  generateMockPets,
} from "../utils/generateMockData.js";
import { usersService, petsService } from "../services/index.js";

const router = Router();

// GET /api/mocks/mockingpets
router.get("/mockingpets", async (req, res) => {
  try {
    const quantity = parseInt(req.query.quantity) || 50;

    if (quantity <= 0) {
      return res.status(400).json({
        status: "error",
        error: "Quantity must be a positive number",
      });
    }

    const mockPets = generateMockPets(quantity);

    res.status(200).json({
      status: "success",
      message: `Generated ${quantity} mock pets using Faker`,
      payload: mockPets,
    });
  } catch (error) {
    console.error("Error generating mock pets:", error);
    res.status(500).json({
      status: "error",
      error: "Failed to generate mock pets",
    });
  }
});

// GET /api/mocks/mockingusers
router.get("/mockingusers", async (req, res) => {
 try {
    const quantity = parseInt(req.query.quantity) || 50;

    if (quantity <= 0) {
      return res.status(400).json({
        status: "error",
        error: "Quantity must be a positive number",
      });
    }

    const mockUsers = await generateMockUsers(quantity);

    res.status(200).json({
      status: "success",
      message: `Generated ${quantity} mock users using Faker`,
      payload: mockUsers,
    });
  } catch (error) {
    console.error("Error generating mock users:", error);
    res.status(500).json({
      status: "error",
      error: "Failed to generate mock users",
    });
  }
});

// POST /api/mocks/generateData
router.post("/generateData", async (req, res) => {
  try {
    const { users, pets } = req.body;

    if (!users && !pets) {
      return res.status(400).json({
        status: "error",
        error: "At least one parameter (users or pets) is required",
      });
    }

    if (
      (users && (!Number.isInteger(users) || users <= 0)) ||
      (pets && (!Number.isInteger(pets) || pets <= 0))
    ) {
      return res.status(400).json({
        status: "error",
        error: "Parameters must be positive integers",
      });
    }

    const results = {
      usersInserted: 0,
      petsInserted: 0,
      users: [],
      pets: [],
    };

    if (users && users > 0) {
      const mockUsers = await generateMockUsers(users);

      for (const user of mockUsers) {
        const insertedUser = await usersService.create(user);
        results.users.push(insertedUser);
        results.usersInserted++;
      }
    }

    if (pets && pets > 0) {
      const mockPets = generateMockPets(pets);

      for (const pet of mockPets) {
        const insertedPet = await petsService.create(pet);
        results.pets.push(insertedPet);
        results.petsInserted++;
      }
    }

    res.status(201).json({
      status: "success",
      message: `Successfully inserted ${results.usersInserted} users and ${results.petsInserted} pets into database using Faker`,
      payload: {
        usersInserted: results.usersInserted,
        petsInserted: results.petsInserted,
        insertedUsers: results.users,
        insertedPets: results.pets,
      },
    });
  } catch (error) {
    console.error("Error generating data:", error);
    res.status(500).json({
      status: "error",
      error: "Failed to generate and insert data into database",
    });
  }
});

export default router;
