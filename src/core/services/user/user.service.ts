import api from "../index";
import User from "./User.entity.ts";

export default class UserService {
    private static _instance: UserService = null;

    private constructor() {}

    public static getInstance(): UserService {
        if (this._instance == null) {
            this._instance = new UserService();
        }
        return this._instance;
    }

    public async Register(userDTO: User) {
        try {
            console.log("user : ", userDTO);
            const response = await api.post(`/user/create-account/local`, {
                user: {
                    username: userDTO.getUsername(),
                    password: userDTO.getPassword(),
                    email: userDTO.getEmail(),
                    fullname: userDTO.getFullname(),
                },
            });
            console.log("response : ", response.statusText);
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

    public async ValidateEmail(email: string) {
        try {
            const response = await api.post("/user/sent-validateToken", {
                email: email,
                subject: "Xác thực tài khoản",
            });
            console.log("response : ", response);
            localStorage.setItem("validateToken", JSON.stringify(response.data.validateToken));
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

    public async ValidateToken(token: number) {
        try {
            const validateToken = JSON.parse(localStorage.getItem("validateToken"));
            const user = JSON.parse(localStorage.getItem("user"));
            const response = await api.post(
                "/user/ValidateToken",
                {
                    email: user.email,
                    valueToken: token,
                },
                {
                    headers: {
                        token: validateToken,
                    },
                }
            );
            localStorage.remomve("validateToken");
            return {
                response,
                user,
            };
        } catch (error) {
            throw new Error(error);
        }
    }
}
