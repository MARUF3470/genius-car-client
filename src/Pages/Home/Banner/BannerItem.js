import React from 'react';
import './bannerItem.css'

const BannerItem = ({ slide }) => {
    const { image, id, prev, next } = slide
    return (
        <div id={`slide${id}`} className="carousel-item relative w-full ">
            <div className='carousel-img '>
                <img src={image} alt='' className="w-full rounded-xl" />
            </div>
            <div className="absolute flex justify-end gap-5 transform -translate-y-1/2 left-5 right-5 bottom-3">
                <a href={`#slide${prev}`} className="btn btn-circle">❮</a>
                <a href={`#slide${next}`} className="btn btn-circle">❯</a>
            </div>
            <div className="absolute transform -translate-y-1/2 left-20 top-1/4">
                <h1 className='text-6xl text-white font-bold'>Affordable <br /> Price For Car  <br /> Servicing</h1>
            </div>
            <div className="absolute transform -translate-y-1/2 left-20 top-1/2">
                <p className='text-xl text-white'>There are many variations of passages of  available, but the majority have suffered alteration in some form</p>
            </div>
            <div className="absolute transform -translate-y-1/2 left-20 top-3/4">
                <button className="btn btn-secondary mr-4">Discover More</button>
                <button className="btn btn-outline btn-warning">Latest Projects</button>
            </div>
        </div>
    );
};

export default BannerItem;