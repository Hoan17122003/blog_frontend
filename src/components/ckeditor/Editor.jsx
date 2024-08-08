import React, { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import classNames from "classnames/bind";
import styles from "./CKEditorComponent.module.scss";
import { PostSerivce } from "~/core/services/post/post.service.ts";
import { Post } from "~/core/services/post/Post.entity.ts";

const cx = classNames.bind(styles);

const CkEditorComponent = () => {
    const [content, setContent] = useState("");
    const [tempImages, setTempImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [positionImage, setPositionImage] = useState(1);
    const postNameRef = useRef(null);
    const categoryRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchSomeData();
            setContent(data);
        };

        fetchData();
    }, []);

    const fetchSomeData = async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("<p>Initial content loaded from server</p>");
            }, 2000);
        });
    };

    const customUploadAdapter = (loader) => {
        return {
            upload: () =>
                new Promise((resolve, reject) => {
                    loader.file.then(async (file) => {
                        const url = URL.createObjectURL(file);
                        console.log("file : ", file);
                        setTempImages((prevTempImages) => {
                            return [...prevTempImages, { [url]: file, positionImage }];
                        });
                        return resolve({
                            default: url,
                        });
                    });
                }),
        };
    };

    function MyCustomUploadAdapterPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return customUploadAdapter(loader);
        };
    }

    const handleSubmit = async () => {
        const postSerive = PostSerivce.GetInstance();
        const post = new Post(postNameRef.current.value, content, categoryRef.current.value);
        const postEntity = await postSerive.CreatePost(post);
        const postId = postEntity.data["postId"];
        const data = new Map();
        tempImages.forEach((imgObj, index) => {
            let key;
            for (let element in imgObj) {
                if (element != "positionImage") {
                    key = element;
                }
            }
            data.set(imgObj["positionImage"], imgObj[key]);
        });
        console.log("tempImages : ", tempImages);
        const images = Array.from(data.values());
        const position = Array.from(data.keys());
        const formDataImages = new FormData();

        images.forEach((element) => {
            formDataImages.append("images", element);
        });
        formDataImages.append("positions", position);
        formDataImages.append("post_id", postId);
        const imageCheck = await postSerive.PostImage(formDataImages);
        if (imageCheck.status === 200 || imageCheck.status === 201) {
            alert('Tạo bài viết thành công, chờ duyệt')
            return window.location.reload();
        }
        console.log("imageCheck", imageCheck.data, " ", imageCheck.status);
    };

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        const updatedData = replaceImageTags(data);
        setContent(updatedData);
    };

    const replaceImageTags = (html) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        const images = tempDiv.getElementsByTagName("img");
        let newPosition = positionImage;

        Array.from(images).forEach((img, index) => {
            const src = img.src;
            if (src) {
                console.log("tempImage : ", tempImages);
                console.log("position : ", positionImage);
                if (tempImages.length > 0) {
                    console.log("hehehe");
                    tempImages[tempImages.length - 1]["positionImage"] = positionImage;
                }
                img.outerHTML = `[image[${newPosition}]]`;
                newPosition += 1;
                setPositionImage(newPosition);
            }
        });

        return tempDiv.innerHTML;
    };

    const extractImageUrls = (html) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        const images = tempDiv.getElementsByTagName("img");
        const urls = Array.from(images).map((img) => img.src);

        setTempImages((prevTempImages) => {
            return prevTempImages.filter((imgObj) => urls.includes(imgObj.url));
        });

        setImageUrls(urls);
    };

    return (
        <div className="editor-container">
            <label htmlFor="post_name">Tên bài viết</label>
            <input id="post_name" ref={postNameRef} type="text" placeholder="Tên bài viết" />
            <label htmlFor="category">Danh Mục</label>
            <input ref={categoryRef} type="text" placeholder="danh mục bài viết" id="category" />
            <h4>Nội dung bài viết :</h4>
            <CKEditor
                editor={ClassicEditor}
                config={{
                    extraPlugins: [MyCustomUploadAdapterPlugin],
                    toolbar: [
                        "heading",
                        "|",
                        "bold",
                        "italic",
                        "link",
                        "bulletedList",
                        "numberedList",
                        "blockQuote",
                        "|",
                        "insertTable",
                        "tableColumn",
                        "tableRow",
                        "mergeTableCells",
                        "|",
                        "undo",
                        "redo",
                        "imageUpload",
                    ],
                    image: {
                        toolbar: [
                            "imageTextAlternative",
                            "resizeImage:custom",
                            "imageStyle:alignLeft",
                            "imageStyle:alignCenter",
                            "imageStyle:alignRight",
                        ],
                        resizeOptions: [
                            {
                                name: "resizeImage:custom",
                                label: "Custom",
                                value: null,
                            },
                        ],
                        styles: ["alignLeft", "alignCenter", "alignRight"],
                    },
                }}
                data={content}
                onChange={handleEditorChange}
            />
            <h2>Raw Content</h2>
            <pre>{content}</pre>
            <h2>Image URLs</h2>
            <ul>
                {imageUrls.map((url, index) => (
                    <li key={index}>{`[image[${index + 1}]]: ${url}`}</li>
                ))}
            </ul>

            <h2>Rendered Content</h2>
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <button type="submit" onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
};

export default CkEditorComponent;
