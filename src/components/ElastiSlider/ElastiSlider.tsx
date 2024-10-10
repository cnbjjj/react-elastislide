import React, { useState, useEffect, useRef } from 'react'
import { IImageSlide, IVideoSlide, IElastiSlide, ElastiSlideType, IDOMSlide } from './slides/Interfaces'
import { ElastiSliderProps } from './Interfaces'
import DOMSlide from './slides/DOMSlide'
import ImageSlide from './slides/ImageSlide'
import VideoSlide from './slides/VideoSlide'
import ArrowButton from '../common/ArrowButton'

function ElastiSlider({
    slides,
    slideWidth,
    slideHeight,
    gap,
    animDuration,
    animDelay,
    btnPrev,
    btnNext,
    overflow,
    classNames,
    onSlideClicked,
    onFirstScreen,
    onLastScreen,
    onScreenChanged
}: ElastiSliderProps) {
    slides = slides || [];
    slideWidth = slideWidth || 361;
    slideHeight = slideHeight || 368;
    gap = gap || 20;
    animDuration = animDuration || 0.45;
    animDelay = animDelay || 0.075;
    btnPrev = btnPrev || undefined;
    btnNext = btnNext || undefined;
    overflow = overflow !== undefined ? overflow : true;
    onSlideClicked = onSlideClicked || undefined;
    onFirstScreen = onFirstScreen || undefined;
    onLastScreen = onLastScreen || undefined;
    onScreenChanged = onScreenChanged || undefined;
    classNames = {
        container: 'eslider-container container',
        arrows: 'eslider-arrows container',
        arrow: 'eslider-arrow',
        arrowPrev: 'prev',
        arrowNext: 'next',
        hidden: 'hidden',
        slider: 'eslider',
        slide: 'eslide',
        slideContent: 'eslide-content',
        ...(classNames || {}),
    };

    const containerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const directionRef = useRef<number>(1);
    const counterRef = useRef<number>(0);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [totalSteps, setToptalSteps] = useState<number>(0);
    // const [currentSlide, setCurrentSlide] = useState<number>(0);

    useEffect(() => {
        overflow && sliderRef.current?.setAttribute('style', `overflow: visible`);
        let offset = (!overflow ? -containerRef.current?.offsetLeft! : 0);
        setToptalSteps(
            Math.ceil(((slideWidth + gap) * slides.length + offset - sliderRef.current?.clientWidth!) / (slideWidth + gap)) || 0
        );
        containerRef.current?.setAttribute(
            'style',
            `--eslider-eslide-width: ${slideWidth}px; 
            --eslider-eslide-height: ${slideHeight}px; 
            --eslider-gap: ${gap}px;
            --eslider-eslide-anim-duration: ${animDuration}s;`
        );
    }, []);

    useEffect(() => {
        // console.log('currentStep', currentStep, "totalSteps", totalSteps);
        const slidesElts = sliderRef.current?.querySelectorAll('.eslide');
        slidesElts?.forEach((slide, index) => {
            const position = (index - currentStep) * (slideWidth + gap);
            const elt = slide as HTMLElement;
            const delay = (directionRef.current === 1 ? index : totalSteps - index) * animDelay || 0.075;
            elt.setAttribute(
                'style',
                `--eslider-eslide-anim-delay: ${delay}s;
                left: ${position}px`
            );
        });
        onScreenChanged && onScreenChanged(currentStep, totalSteps, slides);
        if (currentStep === 0)
            onFirstScreen && onFirstScreen(slides);
        if (currentStep === totalSteps)
            onLastScreen && onLastScreen(slides);
    }, [currentStep]);

    const preventFastClick = () => {
        if (counterRef.current === 0) {
            counterRef.current = 1;
            setTimeout(() => {
                counterRef.current = 0;
            }, 500);
            return true;
        }
        return false;
    };
    const nextStep = () => {
        if(!preventFastClick()) return;
        directionRef.current = 1;
        const nextStep = currentStep + directionRef.current;
        if (nextStep <= totalSteps)
            setCurrentStep(nextStep);
        else
            console.log('End of slides');
    };

    const prevStep = () => {
        if(!preventFastClick()) return;
        directionRef.current = -1;
        const prevStep = currentStep + directionRef.current;
        if (prevStep >= 0)
            setCurrentStep(prevStep);
        else
            console.log('Start of slides');
    };

    const slideClicked = (index: number) => {
        onSlideClicked && onSlideClicked(index, slides[index], slides);
    };

    // const nextSlide = () => {
    //     const nextSlide = currentSlide + 1;
    //     if (nextSlide < slides.length)
    //         setCurrentSlide(nextSlide);
    //     else
    //         console.log('End of slides');
    // };

    // const prevSlide = () => {
    //     const prevSlide = currentSlide - 1;
    //     if (prevSlide >= 0)
    //         setCurrentSlide(prevSlide);
    //     else
    //         console.log('Start of slides');
    // };

    // TODO: Make slides more generic
    const renderSlide = (slide: IElastiSlide | React.ReactNode) => {
        if (React.isValidElement(slide)) {
            return slide;
        }
        switch ((slide as IElastiSlide).type) {
            case ElastiSlideType.IMAGE:
                return <ImageSlide {...(slide as IImageSlide)} />;
            case ElastiSlideType.DOM:
                return <DOMSlide {...(slide as IDOMSlide)} />;
            case ElastiSlideType.VIDEO:
                return <VideoSlide {...(slide as IVideoSlide)} />;
            default:
                return null;
        }
    };

    return (
        <div className='eslider-wrapper'>
            <div className={`${classNames.container}`} ref={containerRef}>
                <div className={`${classNames.arrows}`}>
                    <div className={`${classNames.arrow} ${classNames.arrowPrev} ${currentStep === 0 && classNames.hidden}`} onClick={prevStep}>
                        {btnPrev && btnPrev || <ArrowButton direction={-1} className='arrow-default' />}
                    </div>
                    <div className={`${classNames.arrow} ${classNames.arrowNext} ${currentStep === totalSteps && classNames.hidden}`} onClick={nextStep}>
                        {btnNext ? btnNext : <ArrowButton direction={1} className='arrow-default' />}
                    </div>
                </div>
                <div className={`${classNames.slider}`} ref={sliderRef}>
                    {slides.map((slide, index) => (
                        <div key={`eslider-eslide-${index} ${classNames.slide}`} className={`${classNames.slide}`}>
                            <div className={`${classNames.slideContent}`} onClick={() => slideClicked(index)}>
                                {renderSlide(slide)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default ElastiSlider;