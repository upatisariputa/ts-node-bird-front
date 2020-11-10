import { PlusOutlined } from "@ant-design/icons";
import React, { useCallback, useState } from "react";
import { ImagePostProps } from "../@types";
import ImagesZoom from "./ImagesZoom";

const PostImages = ({ Images }: { Images: ImagePostProps }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  const _imgReturn = (imgOrder) => {
    return (
      <>
        <img src={Images[imgOrder].src} alt={Images[imgOrder].src} onClick={onZoom} role="presentation" width={imgOrder} />
      </>
    );
  };

  if (Images.length === 1) {
    return (
      <>
        <img src={`http://localhost:3065/${Images[0].src}`} alt={Images[0].src} onClick={onZoom} role="presentation" style={{ width: "40%" }} />
        {showImagesZoom && <ImagesZoom Images={Images} onClose={onClose} />}
      </>
    );
  }

  if (Images.length === 2) {
    return (
      <>
        <div>
          <img src={`http://localhost:3065/${Images[0].src}`} alt={Images[0].src} onClick={onZoom} role="presentation" style={{ width: "20%", display: "inline-block" }} />
          <img src={`http://localhost:3065/${Images[1].src}`} alt={Images[1].src} onClick={onZoom} role="presentation" style={{ width: "20%", display: "inline-block" }} />
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <img src={`http://localhost:3065/${Images[0].src}`} alt={Images[0].src} onClick={onZoom} role="presentation" style={{ width: "40%" }} />
        <div role="presentation" style={{ display: "inline-block", textAlign: "center", verticalAlign: "middle" }} onClick={onZoom}>
          <PlusOutlined />
          <br />
          See more {Images.length - 1} of images
        </div>
        {showImagesZoom && <ImagesZoom Images={Images} onClose={onClose} />}
      </div>
    </>
  );
};

export default PostImages;
