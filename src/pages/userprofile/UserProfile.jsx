import Profile from "~/components/profile/Profile";

function UserProfile() {
    const { user_id } = useParams(); // Lấy userId từ URL
    useEffect(() => {
        const userService = UserService.getInstance();
        const data = async (userId) => {
            console.log("usrId : ", userId);
            const userService = UserService.getInstance();
            const response = await userService.Profile(userId);
            setLoading(false);
            setUser(response.data.data);
        };
    }, [currentPage, user_id]);
    return (
        <>
            <Profile />
        </>
    );
}

export default UserProfile;
