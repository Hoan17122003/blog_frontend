import api from "../index";
export default class CategoryService {
    public async GetAllCategory(access_token: string) {
        try {
            const response = await api.get("/category/all", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }
}
