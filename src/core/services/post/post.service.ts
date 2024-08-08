import api from "../index";
import { Post } from "./Post.entity";

export class PostSerivce {
    private static postSerivce: PostSerivce = null;

    private constructor() {}

    public static GetInstance() {
        if (!PostSerivce.postSerivce) {
            PostSerivce.postSerivce = new PostSerivce();
        }
        return PostSerivce.postSerivce;
    }

    // Get Post pageNumber to pageSize pagnation
    public async GetPostList(pageSize: number, pageNumber: number) {
        try {
            // Post[];
            const response = await api.get(`/post/all?q=${pageNumber}&p=${pageSize}`);
            return response;
        } catch (error) {
            return error;
        }
    }

    public async GetPostDetail(post_id: number) {
        try {
            const response = await api.get(`/post/detail/${post_id}`);
            console.log(response);
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

    public async CreatePost(postDTO: Post) {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const access_token = token["access_token"];
            console.log("accesToken : ", access_token);
            console.log("postDTO : ", postDTO);
            const response = await api.post(
                `/post/create`,
                {
                    post: {
                        post_name: postDTO.post_name,
                        post_content: postDTO.post_content,
                        category_name: postDTO.category_name,
                    },
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            );
            return response;
        } catch (error) {
            throw new Error(error);
            // return alert(error);
        }
    }
    public async PostImage(DataImages) {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const access_token = token["access_token"];
            const response = await api.post(
                "/post/image",
                // {
                //     images: DataImages,
                //     positions: Positions,
                //     post_id: postId,
                // },
                DataImages,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

    public async DeletePost(post_ids: number[], access_token: string) {
        try {
            const response = await api.delete(`/post/delete/${post_ids}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

    // nếu như 1 trong các thuộc tính của postDTO không có thì để undifined
    public async ChangePost(postDTO: Post, post_id: number) {
        try {
            const response = await api.put(`/user/change/${post_id}`, {
                post: {
                    post_name: postDTO.getPostName(),
                    post_content: postDTO.getPostContent(),
                    category_name: postDTO.getCategory(),
                    tag_name: postDTO.getTagName(),
                },
            });
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

    //role only admin
    public async BrowseArticles(post_id: number, state: number) {
        try {
            const response = await api.put(`/post/browse-articles`, {
                post: {
                    post_id,
                    state,
                },
            });
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

    public async GetPostPending() {
        try {
            //data PostPending[]
            const response = await api.get("/post/get-post-pending");
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

    public async GetHistoryBrowseArticles(user_id: number) {
        try {
            //data HistoryBrowseArticle[]
            const response = await api.get(`/post/get-history-browse-articles?user_id=${user_id}`);
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }
}
