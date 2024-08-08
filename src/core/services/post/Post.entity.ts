export interface IPost {
    post_name: string;

    post_content: string;

    tag_name?: string;

    category_id: number;

    getPostName(): string;

    getPostContent(): string;

    getTagName(): string;

    getCategory(): number;
}

export class Post implements IPost {
    post_name: string;
    post_content: string;
    tag_name?: string;
    // category_id: number;
    category_name: string;

    public constructor(post_name: string, post_content: string, category_name: string, tag_name?: string) {
        this.post_name = post_name;
        this.post_content = post_content;
        this.category_name = category_name;
        this.tag_name = tag_name;
    }

    public getPostName(): string {
        return this.post_name;
    }

    public getPostContent(): string {
        return this.post_content;
    }

    public getTagName(): string {
        return this.tag_name;
    }

    public getCategory(): number {
        return this.category_id;
    }
}
