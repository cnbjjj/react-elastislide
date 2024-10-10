import ArrowButton from "../common/ArrowButton";
import CloseButton from "../common/CloseButton";
import { ElastiSlideType, IElastiSlide, IImageSlide, IVideoSlide } from "../ElastiSlider/slides/Interfaces";
import React, { useState, useEffect, useRef } from "react";

export interface ElastiPopupProps {
    width?: number;
    height?: number;
    startIndex: number;
    slides: IElastiSlide[];
    btnPrev?: any;
    btnNext?: any;
    btnClose?: any;
    onShow?: () => void;
    onHide?: () => void;
    onSlideChanged?: (index: number, slide: IElastiSlide, slides: IElastiSlide[]) => void;
    classNames?: {
        container?: string;
        slider?: string;
        slide?: string;
        slideContent?: string;
        arrows?: string;
        arrow?: string;
        arrowPrev?: string;
        arrowNext?: string;
        hidden?: string;
    };
}

function ElastiPopup(props: ElastiPopupProps) {
    let { startIndex, slides, classNames, btnNext, btnPrev, btnClose } = props;
    const [currentSlide, setCurrentSlide] = useState(startIndex);
    const containerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [isShowing, setIsShowing] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    classNames = {
        container: 'epopup-container',
        arrows: 'epopup-arrows',
        arrow: 'epopup-arrow',
        arrowPrev: 'prev',
        arrowNext: 'next',
        hidden: 'hidden',
        slider: 'epopup-slider',
        slide: 'epopup-slide',
        slideContent: 'epopup-slide-content',
        ...(classNames || {}),
    };

    useEffect(() => {
        showPopup();
    }, []);

    useEffect(() => {
        const onScroll = () => isShowing && closePopup();
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
      }, [isShowing]);

    useEffect(() => {
        const parent = containerRef.current;
        const activeSlide = parent?.querySelector(".active") as HTMLElement;
        if (parent && activeSlide) {
            parent.style.width = `${activeSlide.offsetWidth}px`;
            parent.style.height = `${activeSlide.offsetHeight}px`;
        }
        props.onSlideChanged && props.onSlideChanged(currentSlide, slides[currentSlide], slides);
        sliderRef.current?.querySelectorAll('video').forEach((video) => {
            const videoElement = video as HTMLVideoElement;
            videoElement.pause();
        });
    }, [currentSlide]);

    const nextSlide = () => {
        const nextSlide = currentSlide + 1;
        if (nextSlide < slides.length)
            setCurrentSlide(nextSlide);
        else
            console.log('End of popup slides');
    };

    const prevSlide = () => {
        const prevSlide = currentSlide - 1;
        if (prevSlide >= 0)
            setCurrentSlide(prevSlide);
        else
            console.log('Start of popup slides');
    };

    const showPopup = () => {
        if (!isShowing) {
            setIsShowing(true);
            props.onShow && props.onShow();
        }
    };

    const closePopup = () => {
        if (isShowing) {
            setIsClosing(true);
            containerRef.current?.addEventListener('animationend', (e) => {
                switch (e.animationName) {
                    case 'epopup-slideup':
                        setIsShowing(false);
                        setIsClosing(false);
                        props.onHide && props.onHide();
                        break;
                    default:
                        break;
                }
            });
        }
    };

    const renderSlide = (index: number, slide: IElastiSlide) => {
        if (React.isValidElement(slide))
            return slide;
        return <div key={index}>
            {slide.type === ElastiSlideType.DOM && <div>{slide.content}</div>}
            {slide.type === ElastiSlideType.IMAGE && <img src={(slide as IImageSlide).src} alt={"" + Math.random()} />}
            {slide.type === ElastiSlideType.VIDEO && <video src={(slide as IVideoSlide).videoUrl} controls />}
        </div>
    };

    return (
        isShowing && <div className={`epopup-wrapper ${isClosing ? 'closing' : ''}`}>
            <div className="epopup-overlay" onClick={closePopup}></div>
            <div className={`${classNames.container}`} ref={containerRef}>
                <div className="epopup-close" onClick={closePopup}>
                    {btnClose && btnClose || <CloseButton className="close-default" />}
                </div>
                <div className={`${classNames.arrows}`}>
                    <div className={`${classNames.arrow} ${classNames.arrowPrev} ${currentSlide === 0 && classNames.hidden}`} onClick={prevSlide}>
                        {btnPrev && btnPrev || <ArrowButton direction={-1} className='arrow-default' />}
                    </div>
                    <div className={`${classNames.arrow} ${classNames.arrowNext} ${currentSlide === slides.length - 1 && classNames.hidden}`} onClick={nextSlide}>
                        {btnNext ? btnNext : <ArrowButton direction={1} className='arrow-default' />}
                    </div>
                </div>
                <div className={`${classNames.slider}`} ref={sliderRef}>
                    {slides.map((slide, index) => (
                        <div
                            key={`epopup-eslide-${index} ${classNames.slide}`}
                            className={`${classNames.slide} ${currentSlide === index ? 'active' : ''}`}>
                            <div className={`${classNames.slideContent}`}>
                                {renderSlide(index, slide)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default ElastiPopup;