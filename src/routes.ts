import {AuthController} from "./controller/AuthController";

export const Routes = [{
    method: "get",
    route: "/users",
    controller: AuthController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: AuthController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: AuthController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: AuthController,
    action: "remove"
}];