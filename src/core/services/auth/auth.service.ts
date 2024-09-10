import api from "../index";

export default class AuthService {
    public async Login(username: string, password: string) {
        try {
            const response = await api.post(
                "/auth/login/local",
                {
                    username: username,
                    password: password,
                },
                { withCredentials: true }
            );

            return response;
        } catch (error) {
            alert("thông tin đăng nhập không chính xác");
            throw new Error(error);
        }
    }

    public async getAccessToken(refreshToken: string) {
        try {
            const response = await api.get("/auth/getToken", {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            });
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

    public async Logout(access_token: string) {
        try {
            const response = await api.post("/auth/logout", null, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "json/application",
                },
            });
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }
    //[GET]
    public async GetCookie(access_token: string) {
        try {
            const response = await api.get("/auth/cookie", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }
}
