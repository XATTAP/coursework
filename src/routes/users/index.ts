import checkAuth from "@/middlewares/checkAuth";
import { Context, DefaultState } from "koa";
import Router from "koa-router";
import {list, new_create, me_inform, logout, update_profil, delete_person, delete_profil, full_update_profil} from "@/routes/users/users.controller";
import nullcheckAuth from "@/middlewares/nullcheckAuth";

const router = new Router<DefaultState, Context>();

router.prefix("/users");

router.get("/", nullcheckAuth, list);

router.get("/me_inform", checkAuth, me_inform);

router.post("/create", checkAuth, new_create);

router.get("/logout", checkAuth, logout);

router.put("/update", checkAuth, update_profil);

router.put("/full_update/:id", checkAuth, full_update_profil);

router.delete("/delete/:id", checkAuth, delete_person);

router.delete("/delete_profil/:id", checkAuth, delete_profil);

export default router;
