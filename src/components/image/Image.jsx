import { useState, forwardRef } from "react";
// import images from "~/asset/image";

function Image({ src, alt, ...props }, ref) {
    const [failBack, setFailBack] = useState("");
    const handleFailback = () => {
        // setFailBack(images.noImage);
        setFailBack("");
    };
    return <img ref={ref} src={failBack || src} alt={alt} {...props} onError={handleFailback} />;
}

export default forwardRef(Image);
