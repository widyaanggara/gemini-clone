import React, { useState, useContext } from 'react';
import './sidebar.css';
import { FaPlus } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import { IoChatboxOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdHistory } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { Context } from '../../context/Context';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    };

    return (
        <div className={`sidebar ${extended ? 'extended' : ''}`}>
            <div className="top">
                <FaBars onClick={() => setExtended(prev => !prev)} className='icon menu' />
                <div onClick={()=>newChat()} className="new-chat">
                    <FaPlus className='icon' />
                    {extended && <p>New Chat</p>}
                </div>
                {extended && (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompts.map((item, index) => (
                            <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                                <IoChatboxOutline className='icon' />
                                <p>{item.slice(0, 18)} ...</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="bottom">
                <div className="bottom-item">
                    <IoIosHelpCircleOutline className='icon' />
                    {extended && <p>Help</p>}
                </div>
                <div className="bottom-item">
                    <MdHistory className='icon' />
                    {extended && <p>Activity</p>}
                </div>
                <div className="bottom-item">
                    <IoSettingsOutline className='icon' />
                    {extended && <p>Settings</p>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
