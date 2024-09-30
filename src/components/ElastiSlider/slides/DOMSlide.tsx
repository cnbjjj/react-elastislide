import { IDOMSlide } from "./Interfaces";
import React from 'react';

export default function DOMSlide(props: IDOMSlide) {
    const { content } = props;
    return <>{content}</>;
}