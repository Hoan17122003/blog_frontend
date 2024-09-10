import api from "../index";

export default class CommentService {
    public async CreateComment(data: string, postId: number) {
        try {
            const access_token = JSON.parse(localStorage.getItem("token")).access_token;
            const response = await api.post(
                `/comment/create-comment/${postId}`,
                {
                    content: data,
                },
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            );
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

    public async RemoveComment(postId: number, commentId: number) {
        try {
            const access_token = JSON.parse(localStorage.getItem("token")).access_token;
            const response = await api.delete(`/comment/PostId/DeleteComment/${postId}/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            return response;
        } catch (error) {}
    }

    public async ReplyComment(content: string, postId: number, parentId: number) {
        try {
            const access_token = JSON.parse(localStorage.getItem("token")).access_token;
            const response = await api.post(
                `localhost:8080/comment/${postId}/reply/${parentId}`,
                {
                    content,
                },
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            );
        } catch (error) {}
    }
}
