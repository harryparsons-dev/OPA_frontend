import React, {useEffect, useState} from "react";
import { motion } from "framer-motion";
import ImageSliderComponent from "../components/imageSliderComponet";
import '../Styles/available_artwork.css'
const api = process.env.REACT_APP_APIURL;
const token = process.env.REACT_APP_TOKEN
const imagesapi = process.env.REACT_APP_IMAGEURL;


function AvailableArtwork() {
    const [availableArtworks, setAvailableArtworks] = useState([]);
    const [isImageSliderOpen, setIsImageSliderOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    const fetchAvailableArtworks = async () => {
        try {
            const response = await fetch(`${api}/api/posts?populate=*&filters[is_available][$eq]=true&sort=createdAt`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setAvailableArtworks(data.data);
        }
        catch(error) {
            console.log(error);
        }
    }


    function openImageSlider(id) {
        setIsImageSliderOpen(true);
        setCurrentImage(id);
    }

    useEffect( () => {
        fetchAvailableArtworks()
    },[])


    if(availableArtworks.length === 0){
        return <div style={{textAlign:'center'}}>No available artwork</div>
    }


    return (
        <motion.div
            className="Gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
        >
        <div className="artwork-heading">Available Artwork</div>
        <div className="content-gallery">
            {availableArtworks.map((artwork, ID) => (
                <div className="post" key={artwork.id}>
                    {artwork.attributes.media.data.map((image, id2) => {
                        if (image.attributes.url.split(".").pop() === "jpg")
                            return (
                                <div key={`jpg-${image.id}`}>
                                    <div
                                        className="imgcontainer"
                                        onClick={() => openImageSlider(artwork.id)}
                                    >

                                            <img
                                                src={imagesapi + image.attributes.url}

                                                alt={image.attributes.formats.small ? image.attributes.formats.small : ""}
                                            />
                                    </div>
                                </div>
                            );
                        else
                            return (
                                <div key={`video-${image.id}`}>
                                    <div className="imgcontainer"  onClick={() => openImageSlider(artwork.id)}>
                                            <video
                                                className="video"
                                                controls="controls autoplay"
                                            >
                                                <source
                                                    src={
                                                        imagesapi + image.attributes.url + "#t=0.001"
                                                    }
                                                />
                                            </video>
                                    </div>
                                </div>
                            );
                    })}
                    <div className="cap">{artwork.attributes.caption }</div>
                </div>
            ))}
        </div>
        <ImageSliderComponent posts={availableArtworks} postId={currentImage} isOpen={isImageSliderOpen}  handleClose={() => setIsImageSliderOpen(false)} />
        </motion.div>


    )
}


export default AvailableArtwork;