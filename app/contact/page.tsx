"use client";

import React, { useState } from "react";
import "./page.css";

const Page = () => {
    return (
        <div>
            <div className="contact">
                <img src="/image/icon/cv.min.svg" alt="" />
                <a href="./CV_Elliott_RAMET-GROUT.pdf">CV</a>
            </div>
            <div className="contact">
                <img src="/image/icon/instagram.min.svg" alt="" />
                <a href="">Instagram</a>
            </div>
            <div className="contact">
                <img src="/image/icon/linkedin.min.svg" alt="" />
                <a href="">LinkedIn</a>
            </div>
            <div className="contact">
                <img src="/image/icon/github.min.svg" alt="" />
                <a href="">GitHub</a>
            </div>
            <div className="contact">
                <img src="/image/icon/twitter.min.svg" alt="" />
                <a href="">Twitter</a>
            </div>
            <div className="contact">
                <img src="/image/icon/discord.min.svg" alt="" />
                <a href="">Discord</a>
            </div>
        </div>
    );
};

export default Page;
