import Elysia from "elysia";

export const logoutRoute = new Elysia().post("/logout",() => {
    return{
        message: "logged out from ur account"
    }
})