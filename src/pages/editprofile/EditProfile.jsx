// import classNames from "classnames/bind";
// import Styles from "./editprofile.module.scss";
// import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
// import UserService from "~/core/services/user/user.service.ts";
// // import Image from "~/components/images/Image";
// import { Images } from "~/components/index";

// const cx = classNames.bind(Styles);

// function EditProfile({}) {
//     const [user, setUser] = useState();
//     const avatarRef = useRef();
//     const canvasRef = useRef();
//     const imageRef = useRef();
//     const [valueImage, setvalueImage] = useState(null);
//     const [checkPassword, setCheckPassword] = useState(false);
//     const [password, setPassword] = useState("");
//     const [warning, setWarning] = useState(false);

//     useLayoutEffect(() => {
//         const fetchData = async () => {
//             const userService = UserService.getInstance();
//             const access_token = JSON.parse(localStorage.getItem("token")).access_token;
//             const response = await userService.GetMeProfile(access_token);
//             if (response.status === 200 || response.status === 201) {
//                 const value = {
//                     ...response.data,
//                 };
//                 setUser(value);
//                 console.log("response : ", response);
//             } else {
//                 console.error("Failed to fetch user profile", response.data);
//             }
//         };
//         fetchData();
//     }, []);

//     const handlePostImage = () => {
//         // Thực hiện xử lý upload ảnh tại đây
//         // Sau khi hoàn tất, có thể đóng modal:
//         console.log("avatar : ", valueImage);
//         const fetchData = async function () {
//             const access_token = JSON.parse(localStorage.getItem("token")).access_token;
//             const userService = UserService.getInstance();
//             const response = await userService.UploadAvatar(valueImage, access_token);
//             console.log("response : ", response);
//             if (response.status === 200 || response.status === 201) {
//                 alert("Upload ảnh thành công");
//             } else {
//                 console.error("Failed to upload avatar", response.data);
//             }
//         };
//         fetchData();
//         document.getElementById("avatar").classList.remove("show");
//         document.querySelector(".modal-backdrop").remove();
//         document.body.classList.remove("modal-open");
//         document.body.style.paddingRight = "";
//     };

//     const handleFileUpload = () => {
//         avatarRef.current.click();
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = (event) => {
//                 const img = new Image();
//                 img.onload = () => {
//                     const canvas = canvasRef.current;
//                     const ctx = canvas.getContext("2d");
//                     // Xóa nội dung canvas trước đó
//                     ctx.clearRect(0, 0, canvas.width, canvas.height);
//                     // Vẽ ảnh lên canvas
//                     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//                 };
//                 setvalueImage(file);
//                 img.src = event.target.result;
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     // const checkCallback = useMemo(
//     //     (value) => {
//     //         if (value.length <= 0) {
//     //             setCheckPassword();
//     //             return false;
//     //         }
//     //         return true;
//     //     },
//     //     [password]
//     // );
//     const useCheck = useCallback(() => {
//         if (password.length <= 0) {
//             setCheckPassword(false);
//             setWarning(true);
//             return false;
//         }
//         setCheckPassword(true);
//         setWarning(false);
//         return true;
//     }, [password]);

//     const handleChangePassword = (e) => {
//         console.log("password : ", password);
//         // checkCallback(e.target.value);
//         useCheck();

//         setPassword(e.target.value);
//     };
//     const handleCheckPassword = (e) => {
//         // todo : apply useDebounce check password
//     };
//     console.log("checkPassword : ", checkPassword);

//     return (
//         <>
//             <div className={cx("edit-profile")}>
//                 <div className={cx("header")}>
//                     <div data-bs-toggle="modal" data-bs-target="#avatar" className={cx("avatar")}>
//                         <Images
//                             ref={imageRef}
//                             src={`http://localhost:8080/${user?.avatar}` || avatarRef.current.value}
//                             alt="Profile Avatar"
//                             className={cx("avatar-img")}
//                         />
//                     </div>
//                     <h3 className={cx("text-content")}>Chào mừng, {user?.fullname}</h3>
//                 </div>
//                 <div className={cx("content")}>
//                     <div className={cx("me")}>
//                         <div className={cx("fullname")}>
//                             <label htmlFor="">Tên tài khoản hiển thị</label>
//                             <input type="text" name="" id="" className="fullname" value={user?.fullname} />
//                         </div>
//                         <div className={cx("password")}>
//                             <label htmlFor="password">Password</label>
//                             <input
//                                 onChange={handleChangePassword}
//                                 type="text"
//                                 name=""
//                                 id="password"
//                                 className="password"
//                                 placeholder="password"
//                             />
//                             {/* {(checkPassword === true) &
//                             ( */}
//                             <>
//                                 <label htmlFor="TryPasswordAgain">Nhập lại mật khẩu</label>
//                                 <input
//                                     onChange={handleCheckPassword}
//                                     type="text"
//                                     name=""
//                                     id="TryPasswordAgain"
//                                     classNames={cx("password")}
//                                     placeholder="Nhập lại mật khẩu"
//                                 />{" "}
//                                 {warning && <span>mật khẩu không khớp</span>}
//                             </>
//                             {/* )} */}
//                         </div>
//                         <div className={cx("email")}>
//                             <label htmlFor="email">email</label>
//                             <input type="email" name="" id="email" className="email" value={user?.email} />
//                         </div>
//                     </div>
//                     {/* submit */}
//                     <button disabled={warning && true}>lưu thay đổi</button>
//                 </div>
//                 <div
//                     className="modal fade"
//                     id="avatar"
//                     tabIndex="-1"
//                     aria-labelledby="exampleModalLabel"
//                     aria-hidden="true"
//                 >
//                     <div className="modal-dialog">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h4 className="modal-title fs-5" id="exampleModalLabel">
//                                     Thay đổi hình đại diện
//                                 </h4>
//                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
//                                     &times;
//                                 </button>
//                             </div>
//                             <div className={cx("upload")}>
//                                 <div className="modal-footer">
//                                     <div>
//                                         <input
//                                             ref={avatarRef}
//                                             type="file"
//                                             accept=".jpg, .jpeg, .png, .gif"
//                                             style={{ display: "none" }} // Ẩn input file đi
//                                             onChange={handleImageChange}
//                                         />
//                                         <canvas
//                                             ref={canvasRef}
//                                             onClick={handleFileUpload}
//                                             style={{
//                                                 width: "260px",
//                                                 height: "260px",
//                                                 backgroundColor: "rgb(175 165 175 / 50%)",
//                                             }}
//                                         ></canvas>
//                                     </div>
//                                     <hr
//                                         style={{
//                                             border: "5px solid #0cc",
//                                             width: "100%",
//                                         }}
//                                     />
//                                 </div>
//                                 <div>
//                                     <button
//                                         style={{
//                                             marginBottom: "15px",
//                                         }}
//                                         onClick={handlePostImage}
//                                         type="button"
//                                         className="btn btn-primary"
//                                     >
//                                         Lưu
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default EditProfile;

import classNames from "classnames/bind";
import Styles from "./editprofile.module.scss";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import UserService from "~/core/services/user/user.service.ts";
import { Images } from "~/components/index";

const cx = classNames.bind(Styles);

function EditProfile({}) {
    const [user, setUser] = useState();
    const avatarRef = useRef();
    const canvasRef = useRef();
    const imageRef = useRef();
    const [valueImage, setValueImage] = useState(null);
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [warning, setWarning] = useState(false);
    const [isPasswordMatching, setIsPasswordMatching] = useState(false);

    useLayoutEffect(() => {
        const fetchData = async () => {
            const userService = UserService.getInstance();
            const access_token = JSON.parse(localStorage.getItem("token")).access_token;
            const response = await userService.GetMeProfile(access_token);
            if (response.status === 200 || response.status === 201) {
                const value = {
                    ...response.data,
                };
                setUser(value);
                console.log("response : ", response);
            } else {
                console.error("Failed to fetch user profile", response.data);
            }
        };
        fetchData();
    }, []);

    const handlePostImage = () => {
        console.log("avatar : ", valueImage);
        const fetchData = async function () {
            const access_token = JSON.parse(localStorage.getItem("token")).access_token;
            const userService = UserService.getInstance();
            const response = await userService.UploadAvatar(valueImage, access_token);
            console.log("response : ", response);
            if (response.status === 200 || response.status === 201) {
                alert("Upload ảnh thành công");
            } else {
                console.error("Failed to upload avatar", response.data);
            }
        };
        fetchData();
        document.getElementById("avatar").classList.remove("show");
        document.querySelector(".modal-backdrop").remove();
        document.body.classList.remove("modal-open");
        document.body.style.paddingRight = "";
    };

    const handleFileUpload = () => {
        avatarRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = canvasRef.current;
                    const ctx = canvas.getContext("2d");
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                };
                setValueImage(file);
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChangePassword = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        if (newPassword !== retypePassword && retypePassword.length > 0) {
            setWarning(true);
            setIsPasswordMatching(false);
        } else {
            setWarning(false);
            setIsPasswordMatching(true);
        }
    };

    // Sử dụng useEffect để debounce khi nhập lại mật khẩu
    useEffect(() => {
        const handler = setTimeout(() => {
            if (retypePassword) {
                if (password !== retypePassword) {
                    setWarning(true);
                    setIsPasswordMatching(false);
                } else {
                    setWarning(false);
                    setIsPasswordMatching(true);
                }
            }
        }, 1000);

        // Cleanup function: sẽ được gọi nếu `retypePassword` thay đổi trước khi timeout hoàn thành
        return () => {
            clearTimeout(handler);
        };
    }, [retypePassword, password]);

    const handleRetypePassword = (e) => {
        setRetypePassword(e.target.value);
    };

    return (
        <>
            <div className={cx("edit-profile")}>
                <div className={cx("header")}>
                    <div data-bs-toggle="modal" data-bs-target="#avatar" className={cx("avatar")}>
                        <Images
                            ref={imageRef}
                            src={`http://localhost:8080/${user?.avatar}` || avatarRef.current.value}
                            alt="Profile Avatar"
                            className={cx("avatar-img")}
                        />
                    </div>
                    <h3 className={cx("text-content")}>Chào mừng, {user?.fullname}</h3>
                </div>
                <div className={cx("content")}>
                    <div className={cx("me")}>
                        <div className={cx("fullname")}>
                            <label htmlFor="">Tên tài khoản hiển thị</label>
                            <input type="text" name="" id="" className="fullname" value={user?.fullname} />
                        </div>
                        <div className={cx("password")}>
                            <label htmlFor="password">Mật khẩu</label>
                            <input
                                onChange={handleChangePassword}
                                type="password"
                                id="password"
                                className="password"
                                placeholder="Mật khẩu"
                            />
                            {password && (
                                <>
                                    <label htmlFor="retypePassword">Nhập lại mật khẩu</label>
                                    <input
                                        onChange={handleRetypePassword}
                                        type="password"
                                        id="retypePassword"
                                        className={cx("password")}
                                        placeholder="Nhập lại mật khẩu"
                                    />
                                    {warning && <span className={cx("warning")}>Mật khẩu không khớp</span>}
                                </>
                            )}
                        </div>
                        <div className={cx("email")}>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" className="email" value={user?.email} />
                        </div>
                    </div>
                    <button disabled={!isPasswordMatching || password === ""}>Lưu thay đổi</button>
                </div>
                <div
                    className="modal fade"
                    id="avatar"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title fs-5" id="exampleModalLabel">
                                    Thay đổi hình đại diện
                                </h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                    &times;
                                </button>
                            </div>
                            <div className={cx("upload")}>
                                <div className="modal-footer">
                                    <div>
                                        <input
                                            ref={avatarRef}
                                            type="file"
                                            accept=".jpg, .jpeg, .png, .gif"
                                            style={{ display: "none" }}
                                            onChange={handleImageChange}
                                        />
                                        <canvas
                                            ref={canvasRef}
                                            onClick={handleFileUpload}
                                            style={{
                                                width: "260px",
                                                height: "260px",
                                                backgroundColor: "rgb(175 165 175 / 50%)",
                                            }}
                                        ></canvas>
                                    </div>
                                    <hr
                                        style={{
                                            border: "5px solid #0cc",
                                            width: "100%",
                                        }}
                                    />
                                </div>
                                <div>
                                    <button
                                        style={{
                                            marginBottom: "15px",
                                        }}
                                        onClick={handlePostImage}
                                        type="button"
                                        className="btn btn-primary"
                                    >
                                        Lưu
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditProfile;
