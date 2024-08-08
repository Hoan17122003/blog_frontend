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

    public async Logout(access_token: string) {
        try {
            const response = await api.post("/auth/logout", null, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            return response;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}
