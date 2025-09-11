import React, {useEffect, useState} from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import "../Styles/ImageSlider.css";
const api = process.env.REACT_APP_IMAGEURL;

function ImageSliderComponent({isOpen = false, posts = [], postId = null, handleClose}) {
    const [current, setCurrent] = useState(null);
    const [loading, setLoading] = useState(true);
    const nextSlide = () => {
        if (current === parseInt(posts.length - 1)) {
            setCurrent(0);
        } else {
            setCurrent(parseInt(current + 1));
        }
    };
    const prevSlide = () => {
        if (current === 0) {
            setCurrent(posts.length - 1);
        } else {
            setCurrent(parseInt(current - 1));
        }
    };

    useEffect(() => {
        if(!isOpen) return;
        setLoading(true)
        let index = posts.findIndex(post => post.id === postId)
        setCurrent(index)
        setLoading(false)
    }, [isOpen, postId, posts])


    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "unset";
    }, [isOpen]);

    const close = () => {
        handleClose()
        setCurrent(null)
    }

    if(!isOpen) return null;
    if(current === null) return null
    if(loading) return null;
    if (!Array.isArray(posts)) {
        return null;
    }
    return (
        <div
            className="ImageSlider"
        >
            <button className="close" onClick={close}>
                <AiOutlineClose />
            </button>
            <div className="slider">
                <FaLessThan className="left-arrow" onClick={prevSlide} />
                <FaGreaterThan className="right-arrow" onClick={nextSlide} />

                <div className="i-content">
                    {posts.map((post,i) => (
                        <div key={post.id}>
                            {post.attributes.media.data.map((image) => {
                                return (
                                    <div key={`media-${image.id}`}>
                                        <div
                                            className={
                                                current === i &&
                                                image.attributes.url.split(".").pop() === "jpg"
                                                    ? "slide active"
                                                    : "slide"
                                            }
                                        >
                                            {current === i &&
                                                image.attributes.url.split(".").pop() === "jpg" && (
                                                    <img
                                                        src={api + image.attributes.url}
                                                        className="image"
                                                        alt={image.attributes.formats.large.url}
                                                    />
                                                )}
                                        </div>
                                        <div
                                            className={
                                                current === i &&
                                                image.attributes.url.split(".").pop() !== "jpg"
                                                    ? "slide active"
                                                    : "slide"
                                            }
                                        >
                                            {current === i &&
                                                image.attributes.url.split(".").pop() !== "jpg" && (
                                                    <video className="video" controls="controls autoplay">
                                                        <source src={api + image.attributes.url} />
                                                    </video>
                                                )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ImageSliderComponent;
