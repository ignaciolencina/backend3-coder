import { Router } from "express";
import usersController from "../controllers/users.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestión de usuarios del sistema
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     description: Recupera una lista de todos los usuarios registrados en el sistema
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *             example:
 *               status: success
 *               payload:
 *                 - _id: "64f8a1b2c3d4e5f6789012ab"
 *                   first_name: "Juan"
 *                   last_name: "Pérez"
 *                   email: "juan.perez@email.com"
 *                   role: "user"
 *                   pets: []
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", usersController.getAllUsers);

/**
 * @swagger
 * /api/users/{uid}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Users]
 *     description: Recupera la información de un usuario específico mediante su ID
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID único del usuario
 *         schema:
 *           type: string
 *           example: "64f8a1b2c3d4e5f6789012ab"
 *     responses:
 *       200:
 *         description: Usuario encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   $ref: '#/components/schemas/User'
 *             example:
 *               status: success
 *               payload:
 *                 _id: "64f8a1b2c3d4e5f6789012ab"
 *                 first_name: "Juan"
 *                 last_name: "Pérez"
 *                 email: "juan.perez@email.com"
 *                 role: "user"
 *                 pets: []
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               status: error
 *               error: "User not found"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:uid", usersController.getUser);

/**
 * @swagger
 * /api/users/{uid}:
 *   put:
 *     summary: Actualizar un usuario
 *     tags: [Users]
 *     description: Actualiza la información de un usuario existente
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID único del usuario a actualizar
 *         schema:
 *           type: string
 *           example: "64f8a1b2c3d4e5f6789012ab"
 *     requestBody:
 *       required: true
 *       description: Datos del usuario a actualizar
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *           example:
 *             first_name: "Juan Carlos"
 *             last_name: "Pérez González"
 *             email: "juancarlos.perez@email.com"
 *             role: "admin"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessMessage'
 *             example:
 *               status: success
 *               message: "User updated"
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               status: error
 *               error: "User not found"
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:uid", usersController.updateUser);

/**
 * @swagger
 * /api/users/{uid}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Users]
 *     description: Elimina un usuario del sistema mediante su ID
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID único del usuario a eliminar
 *         schema:
 *           type: string
 *           example: "64f8a1b2c3d4e5f6789012ab"
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessMessage'
 *             example:
 *               status: success
 *               message: "User deleted"
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               status: error
 *               error: "User not found"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:uid", usersController.deleteUser);

export default router;
