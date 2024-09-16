import React from "react";
import Featured from "../components/featured/Featured";
// import TrustedBy from "../components/Trusted By/TrustedBy";
import Slide from "../components/Slide/Slide";
import { cards, projects } from "../data";
import CatCard from "../components/catCard/CatCard";
import ProjectCard from "../components/projectCard/ProjectCard";
import { useNavigate } from "react-router-dom";
 
const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home">
            <Featured />
            {/* <TrustedBy /> */}
            <Slide slidesToShow={5} arrowsScroll={5}>
                {cards.map(card => (
                    <CatCard item={card} key={card.id} />
                ))}
            </Slide>
            {/* <div className="features py-8 md:py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex-1 mb-8 md:mb-0">
                            <h1 className="text-2xl md:text-3xl font-bold mb-4">The best part? Everything.</h1>
                            <div className="flex items-center mb-4">
                                <img src="/images/check.png" alt="check" className="w-6 h-6 mr-2" />
                                <span className="font-semibold">Stick to your budget</span>
                            </div>
                            <p className="mb-4">Find the right service for every price point. No hourly rates, just project-based pricing.</p>
                            <div className="flex items-center mb-4">
                                <img src="/images/check.png" alt="check" className="w-6 h-6 mr-2" />
                                <span className="font-semibold">Get quality work done quickly</span>
                            </div>
                            <p className="mb-4">Hand your project over to a talented freelancer in minutes, get long-lasting results.</p>
                            <div className="flex items-center mb-4">
                                <img src="/images/check.png" alt="check" className="w-6 h-6 mr-2" />
                                <span className="font-semibold">Pay when you're happy</span>
                            </div>
                            <p className="mb-4">Upfront quotes mean no surprises. Payments only get released when you approve.</p>
                            <div className="flex items-center mb-4">
                                <img src="/images/check.png" alt="check" className="w-6 h-6 mr-2" />
                                <span className="font-semibold">Count on 24/7 support</span>
                            </div>
                            <p>Our round-the-clock support team is available to help anytime, anywhere.</p>
                        </div>
                        <div className="flex-1">
                            <video src="/images/video.mp4" controls className="w-full" />
                        </div>
                    </div>
                </div>
            </div> */}
             <div className="explore py-8 md:py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl md:text-3xl font-bold mb-8">You need it, we've got it</h1>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[
                            { cat: 'Graphics & Design', imgSrc: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg' },
                            { cat: 'Digital Marketing', imgSrc: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/online-marketing.74e221b.svg' },
                            { cat: 'Writing & Translation', imgSrc: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/writing-translation.32ebe2e.svg' },
                            { cat: 'Video & Animation', imgSrc: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg' },
                            { cat: 'Music & Audio', imgSrc: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/music-audio.320af20.svg' },
                            { cat: 'Programming & Tech', imgSrc: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg' },
                            { cat: 'Business', imgSrc: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/business.bbdf319.svg' },
                            { cat: 'Lifestyle', imgSrc: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lifestyle.745b575.svg' },
                            { cat: 'Data', imgSrc: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/data.718910f.svg' },
                            { cat: 'Photography', imgSrc: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/photography.01cf943.svg' }
                        ].map(({ cat, imgSrc }) => (
                            <div key={cat} className="flex flex-col items-center cursor-pointer" onClick={() => navigate(`gigs?cat=${cat}`)}>
                                <img src={imgSrc} alt={cat} className="w-16 h-16 mb-2" />
                                <span className="text-center text-sm font-medium">{cat}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div> 
            <div className="features dark py-8 md:py-16 lg:py-24 text-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex-1 mb-8 md:mb-0">
                            <h1 className="text-2xl md:text-3xl font-bold mb-4">GigVerse <em><span className="font-light">business.</span></em></h1>
                            <h1 className="text-2xl md:text-3xl font-bold mb-4">A solution built for <em>business</em></h1>
                            <p className="mb-4">Upgrade to a curated experience to access vetted talent and exclusive tools</p>
                            <div className="flex items-center mb-4">
                                <img src="/images/check.png" alt="check" className="w-6 h-6 mr-2" />
                                <span className="font-semibold">Talent matching</span>
                            </div>
                            <div className="flex items-center mb-4">
                                <img src="/images/check.png" alt="check" className="w-6 h-6 mr-2" />
                                <span className="font-semibold">Dedicated account management</span>
                            </div>
                            <div className="flex items-center mb-4">
                                <img src="/images/check.png" alt="check" className="w-6 h-6 mr-2" />
                                <span className="font-semibold">Team collaboration tools</span>
                            </div>
                            <div className="flex items-center mb-4">
                                <img src="/images/check.png" alt="check" className="w-6 h-6 mr-2" />
                                <span className="font-semibold">Business payment solutions</span>
                            </div>
                            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">Explore GigVerse Business</button>
                        </div>
                        <div className="flex-1">
                            <img src="images/business-desktop-870-x1.webp" alt="business" className="w-full" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="logo_maker py-8 md:py-16 lg:py-24 text-white">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
                    <div className="flex-1 mb-8 md:mb-0 text-center md:text-left">
                        <h1 className="text-2xl md:text-3xl font-bold mb-4">GigVerse <span className="font-bold">logomaker.</span></h1>
                        <p className="text-lg mb-4">Make an incredible logo<br /><em className="text-xl">in minutes</em></p>
                        <p className="mb-4">Pre-designed by top talent. Just add your touch.</p>
                        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"><strong>Try GigVerse Logo Maker</strong></button>
                    </div>
                    <div className="flex-1">
                        <img src="/images/logomaker.webp" alt="logomaker" className="w-full" />
                    </div>
                </div>
            </div>
            <div className="secondslide py-8 md:py-16 lg:py-24">
                <p className="text-center text-2xl md:text-3xl font-bold mb-8 text-white">Inspiring work made on GigVerse</p>
                <Slide slidesToShow={4} arrowsScroll={5}>
                    {projects.map(card => (
                        <ProjectCard item={card} key={card.id} />
                    ))}
                </Slide>
            </div>
          
        </div>
    );
};

export default Home;
