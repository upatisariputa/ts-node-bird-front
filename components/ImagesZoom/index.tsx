import React, { useState } from "react";
import Slick from "react-slick";
import { ImagePostProps } from "../../@types";
import { Overlay, Global, Header, CloseBtn, SlickWrpper, ImgWrapper, Indicator } from "./styles";

const ImagesZoom = ({ Images, onClose }: { Images: ImagePostProps; onClose: () => void }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <>
      <Overlay>
        <Global />
        <Header>
          <h1>Detailed image</h1>
          <CloseBtn onClick={onClose}>X</CloseBtn>
        </Header>
        <SlickWrpper>
          <div>
            <Slick initialSlide={0} beforeChange={(slide) => setCurrentSlide(slide)} infinite arrows={false} slidesToShow={1} slidesToScroll={1}>
              {Images.map((v) => (
                <ImgWrapper key={v.src}>
                  <img src={v.src} alt={v.src} />
                </ImgWrapper>
              ))}
            </Slick>
            <Indicator>
              <div>
                {currentSlide + 1} /{Images.length}
              </div>
            </Indicator>
          </div>
        </SlickWrpper>
      </Overlay>
    </>
  );
};

export default ImagesZoom;
