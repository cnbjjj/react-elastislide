import { useRef, useState } from 'react';
import {ElastiSlider, ElastiSlideType, ElastiSliderProps, IElastiSlide, IVideoSlide, ElastiPopup} from 'react-elastislide';

function ElastiSliderDemo() {
    const [isShowingPopup, setIsShowingPopup] = useState(false);
    const popupRef = useRef<{ index: number, slide: IElastiSlide, slides: IElastiSlide[] }>({ index: 0, slide: {} as IElastiSlide, slides: [] });
    
    const genDom = (content: string) => {
        return <div style={{ 
            backgroundColor: '#eee', 
            width: '100%', height: '100%',
            display: 'grid', placeItems: 'center', 
            color: "white",
            userSelect: 'none'}}
            >
            <h1>{content}</h1>
        </div>;
    };
    const images: string[] = [
        "https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/8784470/pexels-photo-8784470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/416179/pexels-photo-416179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/70069/pexels-photo-70069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/33101/new-wing-emergency-at-the-moment.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/792416/pexels-photo-792416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/36762/scarlet-honeyeater-bird-red-feathers.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/255435/pexels-photo-255435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/2400030/pexels-photo-2400030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/106685/pexels-photo-106685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/2078747/pexels-photo-2078747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/135940/pexels-photo-135940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/2398418/pexels-photo-2398418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/2570085/pexels-photo-2570085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ];

    const randomImage = () => {
        return images[Math.floor(Math.random() * images.length)];
    };
    
    const slides = [
        { type: ElastiSlideType.IMAGE, src: randomImage(), href: '#' },
        { type: ElastiSlideType.DOM, content: genDom('Hello World!')},
        { type: ElastiSlideType.IMAGE, src: randomImage(), href: '#' },
        { type: ElastiSlideType.DOM, content: genDom('Hi, Winnipeg!')},
        { 
            type: ElastiSlideType.VIDEO, 
            coverImg:'', 
            videoUrl: 'https://cdn.pixabay.com/video/2022/12/09/142300-779684895_large.mp4' 
        },
        { type: ElastiSlideType.DOM, content: genDom('Hi, Canada!')},
        //https://cdn.pixabay.com/photo/2022/02/23/18/08/kingfisher-7031148_1280.jpg
        { type: ElastiSlideType.IMAGE, src: randomImage(), href: '#' },
        { type: ElastiSlideType.DOM, content: genDom('Hi!')}
    ];

    const slidesImages = [
        { type: ElastiSlideType.IMAGE, src: randomImage(), href: 'javascript:;' },
        { type: ElastiSlideType.IMAGE, src: randomImage(), href: 'javascript:;' },
        { type: ElastiSlideType.IMAGE, src: randomImage(), href: 'javascript:;' },
        { type: ElastiSlideType.IMAGE, src: randomImage(), href: 'javascript:;' },
        { type: ElastiSlideType.IMAGE, src: randomImage(), href: 'javascript:;' },
        { type: ElastiSlideType.IMAGE, src: randomImage(), href: 'javascript:;' },
        { type: ElastiSlideType.IMAGE, src: randomImage(), href: 'javascript:;' },
        { type: ElastiSlideType.IMAGE, src: randomImage(), href: 'javascript:;' },
    ];

    const slidesVideos = [
        { 
            type: ElastiSlideType.VIDEO, 
            coverImg:'', 
            videoUrl: 'https://videos.pexels.com/video-files/2402370/2402370-hd_1920_1080_24fps.mp4',
            autoplay: false
        },
        { 
            type: ElastiSlideType.VIDEO, 
            coverImg:'', 
            videoUrl: 'https://cdn.pixabay.com/video/2022/12/09/142300-779684895_large.mp4',
            autoplay: false
        },
        { 
            type: ElastiSlideType.VIDEO, 
            coverImg:'', 
            videoUrl: 'https://videos.pexels.com/video-files/2461326/2461326-hd_1920_1080_30fps.mp4',
            autoplay: false
        },
        { 
            type: ElastiSlideType.VIDEO, 
            coverImg:'', 
            videoUrl: 'https://videos.pexels.com/video-files/4793475/4793475-hd_1280_720_60fps.mp4',
            autoplay: true
        }
    ];

    const slideClicked = (index: number, slide: IElastiSlide, slides: IElastiSlide[]) => {
        popupRef.current = { index, slide, slides };
        setIsShowingPopup(true);
    };

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
            // use container to set width
            container: 'eslider-container container',
            arrows: 'eslider-arrows container',
            arrow: 'eslider-arrow',
            arrowPrev: 'prev',
            arrowNext: 'next',
            hidden: 'hidden',
            slider: 'eslider',
            slide: 'eslide',
            slideContent: 'eslide-content',
        },
        onSlideClicked: slideClicked
    };

    const esliderConfig2: ElastiSliderProps = {
        ...esliderConfig,
        slides: slidesImages,
        slideWidth: 500,
        slideHeight: 368
    };

    const esliderConfig3: ElastiSliderProps = {
        ...esliderConfig,
        slides: slidesVideos,
        slideWidth: 600,
        slideHeight: 300
    };

    const esliderConfig4: ElastiSliderProps = {
        ...esliderConfig,
        slides: slides,
        slideWidth: 400,
        slideHeight: 600
    };

    const renderPopup = () =>
        isShowingPopup && <ElastiPopup
            slides={popupRef.current.slides}
            startIndex={popupRef.current.index}
            width={800}
            onShow={() => { }}
            onHide={() => setIsShowingPopup(false)}
        />;

    return (
        <div>
            <h1 className='text-center'>ElastiSlider Demos</h1>
            <ElastiSlider {...esliderConfig} />
            <h1 className='text-center'>ElastiSlider Demos</h1>
            <ElastiSlider {...esliderConfig2} />
            <h1 className='text-center'>ElastiSlider Demos</h1>
            <ElastiSlider {...esliderConfig3} />
            <h1 className='text-center'>ElastiSlider Demos</h1>
            <ElastiSlider {...esliderConfig4} />
            {renderPopup()}
        </div>
    );
}
export default ElastiSliderDemo;