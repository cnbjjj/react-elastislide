export enum ElastiSlideType {
    IMAGE = 'image',
    DOM = 'dom',
    VIDEO = 'video'
}
export interface IElastiSlide {
    type: ElastiSlideType,
    content?: any
}
export interface IVideoSlide extends IElastiSlide {
    coverImg?: string,
    videoUrl: string,
    href?: string,
    playButton?: any,
    autoplay?: boolean
}
export interface IImageSlide extends IElastiSlide {
    src?: string,
    href?: string
}
export interface IDOMSlide extends IElastiSlide {
    content?: any
}