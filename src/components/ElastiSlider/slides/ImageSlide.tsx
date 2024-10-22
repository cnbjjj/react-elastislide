import { IImageSlide } from "./Interfaces";
import React from "react";

export default function ImageSlide(props: IImageSlide) {
    const { href, ...attributes } = props;
    return (
        <div className="eslider-imageslide">
            {href? (
                <a href={href}>
                    <img {...attributes} />
                </a>
            ) : (
                <img {...attributes} />
            )}
        </div>
    );
}