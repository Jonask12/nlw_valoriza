import { Router } from "express";
import { CreateUserController } from "./controllers/createUserController";
import { CreateTagController } from "./controllers/createTagController";
import { ensureAdmin } from "./middiewares/ensureAdmins";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentsController } from "./controllers/CreateComplementsController";
import { ensureAuthenticated } from "./middiewares/ensureAthenticate";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const craeteComplimentController = new CreateComplimentsController();

router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle);
router.post("/users", createUserController.handle);
router.post("/loguin", authenticateUserController.handle);
router.post("/compliments", craeteComplimentController.rundle);

export { router };