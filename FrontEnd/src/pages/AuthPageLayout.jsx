import PropTypes from "prop-types";
import {useState} from "react";

function AuthPageLayout({ children }) {
    return (
        <div className="flex max-h-max bg-purple-100">
            <div className="flex scale-90 mt-10 mb-10 ml-20 mr-20 border border-gray-300 shadow-2xl shadow-gray-400 rounded-full hover:shadow-3xl hover:shadow-gray-400 hover:scale-95">
                <main className="grid grid-cols-2 gap-16 bg-white">
                    <div className="flex overflow-hidden">
                        <img
                            loading="lazy"
                            src="/3.png"
                            className="h-full"
                            alt="Featured product or promotion"
                        />
                    </div>
                    {children}
                </main>
            </div>
        </div>

    );
};

AuthPageLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthPageLayout;
