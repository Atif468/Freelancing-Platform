import React from "react";

const TrustedBy = () => {
    return (
        <div className="bg-gray-100 flex justify-center items-center h-24">
            <div className="max-w-4xl flex items-center justify-center gap-4 text-gray-400 font-medium">
                <span>Trusted by:</span>
                <img
                    src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.12b5e5c.png"
                    alt="meta"
                    className="h-16 object-contain"
                />
                <img
                    src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.61e78c8.png"
                    alt="google"
                    className="h-16 object-contain"
                />
                <img
                    src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.96c5e3f.png"
                    alt="netflix"
                    className="h-16 object-contain"
                />
                <img
                    src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pandg.0f4cfc2.png"
                    alt="p&g"
                    className="h-16 object-contain"
                />
                <img
                    src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.305e264.png"
                    alt="paypal"
                    className="h-16 object-contain"
                />
            </div>
        </div>
    );
};

export default TrustedBy;
