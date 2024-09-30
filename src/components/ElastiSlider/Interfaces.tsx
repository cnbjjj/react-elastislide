import { IElastiSlide } from "./slides/Interfaces";

export type ElastiSliderClassNames = {
    container?: string;
    slider?: string;
    slide?: string;
    slideContent?: string;
    arrows?: string;
    arrow?: string;
    arrowPrev?: string;
    arrowNext?: string;
    hidden?: string;
}

export interface ElastiSliderProps {
    slides: IElastiSlide[], // slides to display
    slideWidth?: number, // width of each slide
    slideHeight?: number, // height of each slide
    gap?: number, // gap between each slide
    animDuration?: number, // duration of slide animation
    animDelay?: number, // delay between each slide animation
    btnPrev?: any, // previous button
    btnNext?: any // next button
    btnPrevContent?: string, // previous button content
    btnNextContent?: string, // next button content
    overflow?: boolean, // show overflow
    classNames?: ElastiSliderClassNames // class names
    onSlideClicked?: (index:number, slide: IElastiSlide, slides:IElastiSlide[]) => void, // on slide clicked
    onFirstScreen?: (slides:IElastiSlide[]) => void, // on first screen
    onLastScreen?: (slides:IElastiSlide[]) => void // on last screen
}