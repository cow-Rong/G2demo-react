import React, { useEffect, useState } from 'react'
import * as _ from 'lodash';
import { useInterval } from '../utils';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
interface SwiperOpt {
    delay: number,
    speed: number
}

const swiperstateinit = [
    { zIndex: 1, width: 570, height: 280, top: 40, left: 'calc(50% - 885px)', opacity: 0.4, index: 0, class: 'tag-left' },
    { zIndex: 2, width: 570, height: 280, top: 40, left: 'calc(50% - 585px)', opacity: 0.5, index: 1, class: 'tag-left' },
    { zIndex: 3, width: 570, height: 321, top: 20, left: 'calc(50% - 285px)', opacity: 1, index: 2, class: '' },
    { zIndex: 2, width: 570, height: 280, top: 40, left: 'calc(50% + 15px)', opacity: 0.5, index: 3, class: 'tag-right' },
    { zIndex: 1, width: 570, height: 280, top: 40, left: 'calc(50% + 315px)', opacity: 0.4, index: 4, class: 'tag-right' },
    { zIndex: 0, width: 0, height: 0, top: 60, left: 'calc(50% - 285px)', opacity: 0, index: 5, class: '' },
];

const countswiper: Record<number, any> = {
    1: [
        { zIndex: 1, width: 570, height: 321, top: 20, left: 'calc(50% - 285px)', opacity: 1, index: 2, class: '' },
    ],
    2: [
        { zIndex: 1, width: 570, height: 280, top: 40, left: 'calc(50% - 585px)', opacity: 1, index: 2, class: '' },
        { zIndex: 1, width: 570, height: 280, top: 40, left: 'calc(50% + 15px)', opacity: 1, index: 2, class: '' },
    ],
    3: [
        { zIndex: 1, width: 570, height: 280, top: 40, left: 'calc(50% - 585px)', opacity: 0.5, index: 0, class: 'tag-left' },
        { zIndex: 2, width: 570, height: 321, top: 20, left: 'calc(50% - 285px)', opacity: 1, index: 2, class: '' },
        { zIndex: 1, width: 570, height: 280, top: 40, left: 'calc(50% + 15px)', opacity: 0.5, index: 3, class: 'tag-right' },
    ],
    4: [
        { zIndex: 1, width: 570, height: 280, top: 40, left: 'calc(50% - 885px)', opacity: 0.5, index: 0, class: 'tag-left' },
        { zIndex: 2, width: 570, height: 280, top: 40, left: 'calc(50% - 585px)', opacity: 1, index: 2, class: '' },
        { zIndex: 2, width: 570, height: 280, top: 40, left: 'calc(50% + 15px)', opacity: 1, index: 2, class: '' },
        { zIndex: 1, width: 570, height: 280, top: 40, left: 'calc(50% + 315px)', opacity: 0.5, index: 3, class: 'tag-right' },
    ],
}

export const Swiper = ({ imgList, option = { delay: 3000, speed: 500 } }: { imgList: any[], option?: SwiperOpt }) => {
    const navigate = useNavigate();

    const [swiperstate, setSwiperstate] = useState(swiperstateinit)
    const [showOpt, setShowOpt] = useState(false);
    const [isRunning, setIsRunning] = useState(false);

    useInterval(() => {
        next();
    }, isRunning ? option.delay : null);

    useEffect(() => {
        if (imgList.length >= 6) {
            // 复制swiperstate最后一个填充满
            const temp = [...swiperstateinit, ..._.fill(Array(imgList.length - 6), swiperstateinit[5])]
            setSwiperstate(temp);
        }
        if (imgList.length > 0 && imgList.length < 5) {
            const temp = countswiper[imgList.length]
            setSwiperstate(temp);
        }

        // 让轮播图开始自动播放
        play();
        return () => {
            setIsRunning(false);
        }
    }, [imgList])

    const handleMouseEnter = () => {
        setShowOpt(true)
        stop()
    }

    const handleMouseLeave = () => {
        setShowOpt(false)
        play()
    }

    const stop = () => {
        setIsRunning(false);
    }

    const play = () => {
        setIsRunning(true);
    }

    const prev = () => {
        setSwiperstate([...swiperstate.slice(1, swiperstate.length), swiperstate[0]])
    }

    const next = () => {
        const len = swiperstate.length - 1;
        const nt = swiperstate[len];
        setSwiperstate([nt, ...swiperstate.slice(0, len)])
    }

    const hanadleNextBtn = () => {
        stop();
        next();
        play();
    }

    const hanadlePreBtn = () => {
        stop();
        prev();
        play();
    }

    const handleLiClick = (e: any) => {
        const index = Number(e.target.attributes['data-index'].value)
        if (index > 2) {
            for (let i = 0; i < index - 2; i++) {
                const len = swiperstate.length - 1;
                const nt = swiperstate[len];
                setSwiperstate([nt, ...swiperstate.slice(0, len)])
            }
        }
        if (index < 2) {
            for (let i = 0; i < 2 - index; i++) {
                setSwiperstate([...swiperstate.slice(1, swiperstate.length), swiperstate[0]])

            }
        }
        if (index === 2) {
            const currentLink = e.target.attributes['alt'].value;
            navigate(`/midp/${currentLink}`);
        }
        play();
    }

    return (
        <div className={styles.swiperArea}>
            <div className={styles.content} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {
                    showOpt ? (
                        <div className={`${styles.preleft} ${styles.btn}`} onClick={hanadlePreBtn}>
                            <div className={styles.arrowText}>&lt;</div>
                        </div>
                    ) : null
                }
                <ul>
                    {
                        swiperstate.length===imgList.length && imgList.map((swiper, index) => {
                            return (<li key={index}
                                style={{
                                    zIndex: swiperstate[index]['zIndex'] || 1,
                                    width: swiperstate[index]['width'],
                                    height: swiperstate[index]['height'],
                                    top: swiperstate[index]['top'],
                                    left: swiperstate[index]['left'],
                                    transform: swiperstate[index]['class'].length === 0 ? 'none' : (swiperstate[index]['class'] === 'tag-left' ? 'perspective(1400px) rotateY(45deg)' : 'perspective(1400px) rotateY(-45deg)'),
                                    transition: `all ${option.speed}ms`
                                }}
                                onClick={handleLiClick}
                            >
                                <div className={styles.swiperwrapper}>
                                    <div className={`${styles.tag} ${styles[swiperstate[index]['class']]}`} >
                                        <span style={{
                                            opacity: swiperstate[index]['class'].length === 0 ? 0 : 1
                                        }}>{swiper.name}</span>
                                    </div>
                                    <div className={styles.mask}
                                        style={{
                                            opacity: swiperstate[index]['class'].length === 0 ? 0 : 0.8
                                        }}
                                    ></div>
                                    <p className={`${styles.swiperwrappertext}`}>{swiper.name}</p>
                                    <img src={swiper.icon} alt={swiper.url? swiper.url:swiper.id}
                                        className={swiperstate[index]['class'].length === 0 ? styles.boxreflect : ''}
                                        style={{ opacity: swiperstate[index]['opacity'] }}
                                        data-index={swiperstate[index]['index']}
                                    />
                                </div>
                            </li>)
                        })
                    }
                </ul>
                {
                    showOpt ? (
                        <div className={`${styles.nextright} ${styles.btn}`} onClick={hanadleNextBtn}>
                            <div className={styles.arrowText}>&gt;</div>
                        </div>
                    ) : null
                }
            </div>
        </div >
    )
}
