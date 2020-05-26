const express = require('express');
const router = express.Router();
import {AuthController} from "../controller/AuthController";

router.post('/register',  AuthController.register);
router.post('/signin',  AuthController.auth_user);
router.get('/me',  AuthController.me);


module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication
 */

/**
 * @swagger
 * path:
 *  /register:
 *    post:
 *      summary: Register a new user
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *  /sign_in:
 *    post:
 *      summary: Register a new user
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              required:
 *                - firstName
 *                - lastName
 *                - email
 *                - password
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */

