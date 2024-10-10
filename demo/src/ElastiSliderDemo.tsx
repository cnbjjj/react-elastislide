import { useRef, useState, useMemo, useCallback } from 'react';
import { ElastiSlider, ElastiSlideType, ElastiSliderProps, IElastiSlide, ElastiPopup } from 'react-elastislide';

function ElastiSliderDemo() {
    const [isShowingPopup, setIsShowingPopup] = useState(false);
    const popupRef = useRef<{ index: number, slide: IElastiSlide, slides: IElastiSlide[] }>({ index: 0, slide: {} as IElastiSlide, slides: [] });

    const images = useMemo(() => [
        "https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/8784470/pexels-photo-8784470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/416179/pexels-photo-416179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/70069/pexels-photo-70069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/33101/new-wing-emergency-at-the-moment.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/792416/pexels-photo-792416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/36762/scarlet-honeyeater-bird-red-feathers.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ], []);

    const randomImage = useCallback(() => {
        return images[Math.floor(Math.random() * images.length)];
    }, [images]);

    const genInfoDom = useCallback(() => {
        return (
            <section className="text-center text-lg grid place-items-center w-full h-full bg-slate-50">
                <h1 className="text-center text-white-50 m-5 bg-fuchsia-50 p-2">DEMO</h1>
                <a className="p-1 underline hover:bg-fuchsia-50 hover:text-white-50 hover:no-underline" href="https://www.npmjs.com/package/react-elastislide">
                    react-elastislide
                </a>
            </section>
        );
    }, []);

    const slides = useMemo(() => [
        { type: ElastiSlideType.DOM, content: genInfoDom() },
        { type: ElastiSlideType.IMAGE, src: randomImage(), href: '#' },
        { type: ElastiSlideType.IMAGE, src: randomImage(), href: '#' },
        { type: ElastiSlideType.VIDEO, coverImg: '', videoUrl: 'https://cdn.pixabay.com/video/2022/12/09/142300-779684895_large.mp4' },
        { type: ElastiSlideType.IMAGE, src: randomImage(), href: '#' },
        { type: ElastiSlideType.DOM, content: genInfoDom() },
        { type: ElastiSlideType.IMAGE, src: randomImage(), href: '#' }
    ], [images]);

    const slidesImages = useMemo(() => [
        { type: ElastiSlideType.IMAGE, src: randomImage(), href: '' },
        { type: ElastiSlideType.IMAGE, src: randomImage(), href: '' },
        { type: ElastiSlideType.IMAGE, src: randomImage(), href: '' },
        { type: ElastiSlideType.IMAGE, src: randomImage(), href: '' },
        { type: ElastiSlideType.IMAGE, src: randomImage(), href: '' },
        { type: ElastiSlideType.DOM, content: genInfoDom() },
        { type: ElastiSlideType.IMAGE, src: randomImage(), href: '' }
    ], [images]);

    const slidesVideos = useMemo(() => [
        { type: ElastiSlideType.VIDEO, coverImg: '', videoUrl: 'https://videos.pexels.com/video-files/2402370/2402370-hd_1920_1080_24fps.mp4', autoplay: false },
        { type: ElastiSlideType.VIDEO, coverImg: '', videoUrl: 'https://cdn.pixabay.com/video/2022/12/09/142300-779684895_large.mp4', autoplay: false },
        { type: ElastiSlideType.VIDEO, coverImg: '', videoUrl: 'https://videos.pexels.com/video-files/4912046/4912046-uhd_2560_1440_24fps.mp4', autoplay: false },
        { type: ElastiSlideType.VIDEO, coverImg: '', videoUrl: 'https://videos.pexels.com/video-files/4793475/4793475-hd_1280_720_60fps.mp4', autoplay: true }
    ], []);

    const slideClicked = useCallback((index: number, slide: IElastiSlide, slides: IElastiSlide[]) => {
        popupRef.current = { index, slide, slides };
        setIsShowingPopup(true);
    }, []);

    const esliderConfig: ElastiSliderProps = {
        slides: slides,
        slideWidth: 368,
        slideHeight: 368,
        gap: 40,
        animDuration: 0.35,
        animDelay: 0.075,
        btnPrev: undefined,
        btnNext: undefined,
        overflow: true,
        classNames: {
            container: 'eslider-container container',
            arrows: 'eslider-arrows container',
            arrow: 'eslider-arrow',
            arrowPrev: 'prev',
            arrowNext: 'next',
            hidden: 'hidden',
            slider: 'eslider',
            slide: 'eslide',
            slideContent: 'eslide-content'
        },
        onSlideClicked: slideClicked
    };

    const esliderConfig3: ElastiSliderProps = {
        ...esliderConfig,
        slides: slidesVideos,
        slideWidth: 600,
        slideHeight: 300
    };

    const esliderConfig4: ElastiSliderProps = {
        ...esliderConfig,
        slides: slidesImages,
        slideWidth: 400,
        slideHeight: 600
    };

    return (
        <div>
            <ElastiSlider {...esliderConfig} />
            {/* <ElastiSlider {...esliderConfig2} /> */}
            <ElastiSlider {...esliderConfig4} />
            <ElastiSlider {...esliderConfig3} />
            {
                isShowingPopup && (
                    <ElastiPopup
                        slides={popupRef.current.slides}
                        startIndex={popupRef.current.index}
                        width={800}
                        onShow={() => { }}
                        onHide={() => setIsShowingPopup(false)}
                    />
                )
            }
        </div>
    );
}

export default ElastiSliderDemo;