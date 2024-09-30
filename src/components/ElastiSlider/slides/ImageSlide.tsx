import { IImageSlide } from "./Interfaces";
import React from "react";

export default function ImageSlide(props: IImageSlide) {
    const { src, href } = props;
    return (
        <div className="eslider-imageslide">
            {href && href!= '' ? (
                <a href={href}>
                    <img src={src} alt="eslide-image" />
                </a>
            ) : (
                <img src={src} alt="eslide-image" />
            )}
        </div>
    );
}