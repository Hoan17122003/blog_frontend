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
                NameEmail: email,
                subject: "Xác thực tài khoản",
            });
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
            if (response.status == 201) {
                localStorage.removeItem("validateToken");
                localStorage.removeItem("user");
            }
            return {
                response,
                user,
            };
        } catch (error) {
            throw new Error(error);
        }
    }

    public async Follow(userIdFollow: number) {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const access_token = token["access_token"];
            const response = await api.post(
                `/user/follow`,
                {
                    userId: userIdFollow,
                },
                {
                    headers: {
                        // "Content-Type": "application/json",
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            );
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

    //[Get]
    public async Profile(userId: number) {
        try {
            const response = await api.get(`/user/profile/${userId}`);
            console.log("response 1231 : ", response);
            const status = response.status;
            if (status != 200 || status != 201) {
                return false;
            }
            return {
                status,
                data: response.data,
            };
        } catch (error) {
            throw new Error(error);
        }
    }
}
