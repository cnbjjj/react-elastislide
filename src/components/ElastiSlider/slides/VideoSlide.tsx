import PlayButton from "../../common/PlayButton";
import { IVideoSlide } from "./Interfaces";
import React, { useEffect, useRef } from 'react';

export default function VideoSlide(props: IVideoSlide) {
    const { coverImg, videoUrl, playButton, autoplay, ...attributes } = props;
    const videoRef = useRef<HTMLVideoElement>(null);
    const playButtonRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
            const video = videoRef.current;
            if (video) {
                video.addEventListener('play',() => {
                    if (playButtonRef.current) 
                        playButtonRef.current.style.display = 'none';
                });
                video.addEventListener('pause',() => {
                    if (playButtonRef.current)
                        playButtonRef.current.style.display = 'block';
                });
            }
    }, []);

    return (
        <div className="eslider-videoslide">
            <div className="video-playbutton" ref={playButtonRef}>
                {playButton && playButton || <PlayButton className="video-playbutton-default" />}
            </div>
            <video ref={videoRef} src={videoUrl} poster={coverImg} {...(autoplay ? { autoPlay: true } : {})} {...attributes} />
        </div>);
}