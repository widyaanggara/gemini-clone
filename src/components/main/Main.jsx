import React, { useContext } from 'react';
import DOMPurify from 'dompurify';
import './main.css';
import { assets } from '../../assets/assets';
import { IoCompassOutline } from "react-icons/io5";
import { FaCode } from "react-icons/fa6";
import { IoChatboxOutline } from "react-icons/io5";
import { GoLightBulb } from "react-icons/go";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { MdMicNone } from "react-icons/md";
import { LuSendHorizonal } from "react-icons/lu";
import { Context } from '../../context/Context';

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

    // Sanitizing resultData using DOMPurify
    const sanitizedResultData = DOMPurify.sanitize(resultData);

    // Handle key press events
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && input.trim() !== "") {
            onSent();
        }
    };

    return (
        <div className='main'>
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Hello, Developer</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <IoCompassOutline className='icon' />
                            </div>
                            <div className="card">
                                <p>Essay writing tips</p>
                                <GoLightBulb className='icon' />
                            </div>
                            <div className="card">
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <IoChatboxOutline className='icon' />
                            </div>
                            <div className="card">
                                <p>Improve the readability of the following code</p>
                                <FaCode className='icon' />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading
                            ?<div className='loader'>
                                <hr />
                                <hr />
                                <hr />
                            </div>
                            :<p dangerouslySetInnerHTML={{ __html: sanitizedResultData }}></p>
                            }
                        </div>
                    </div>
                )}
                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            value={input}
                            type="text"
                            placeholder='Enter a prompt here'
                        />
                        <div>
                            <MdOutlineAddPhotoAlternate className='search-icon' />
                            <MdMicNone className='search-icon' />
                            {input && <LuSendHorizonal onClick={() => onSent()} className='search-icon' />}
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check its responses.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Main;
