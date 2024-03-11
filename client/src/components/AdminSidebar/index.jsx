import React, { useRef } from 'react'
import { FaHome, FaUser } from "react-icons/fa";
import { BsPostcardHeartFill } from "react-icons/bs";
import { TbCategory2 } from "react-icons/tb";
import logo from "../../Images/Logo.png";
import { NavLink } from 'react-router-dom';
import "./style.css"


export const AdminSidebar = () => {
    const clickedElementRef = useRef(null);
    const clickedElementLinkRef = useRef(null);


    const handleClick = (event) => {
        const clickedLi = event.target.closest("li");
        if (!clickedLi) return;

        if (clickedElementRef.current) {
            clickedElementRef.current.classList.remove("active_li");
        }

        clickedElementRef.current = clickedLi;
        clickedLi.classList.add("active_li");

        if (clickedElementLinkRef.current) {
            clickedElementLinkRef.current.classList.remove("active");
        }

        const clickedLink = clickedLi.querySelector("a");
        if (clickedLink) {
            clickedElementLinkRef.current = clickedLink;
            clickedLink.classList.add("active");
        }
    };


    return (

        <nav className="sidebar">
            <div className="sidebar-logo">
                <img src={logo} alt="" />
            </div>

            <ul id="sidebar-menu" className="menu">
                <li onClick={handleClick}>
                    <NavLink
                        className={({ isActive }) => isActive ? "active" : ""}
                        to="dashboard"
                    >
                        <FaHome /><span>Dashboard</span>
                    </NavLink>
                </li>
                {/* <li className='menu-sub' onClick={handleClick}>
                    <a className='side_menu_title'>
                        <BsPostcardHeartFill /><span>Quản lý bài viết</span>
                    </a>

                    <div className='admin-sidebar-submenu'>
                        <NavLink
                            className={({ isActive }) => isActive ? "active" : ""}
                            to="post"
                        >
                            <BsPostcardHeartFill /><span>Bài viết</span>
                        </NavLink>

                        <NavLink
                            className={({ isActive }) => isActive ? "active" : ""}
                            to="approve-posts"
                        >
                            <BsPostcardHeartFill /><span>Phê duyệt bài viết</span>
                        </NavLink>
                    </div>

                </li> */}
                <li onClick={handleClick}>
                    <NavLink
                        className={({ isActive }) => isActive ? "active" : ""}
                        to="post"
                    >
                        <BsPostcardHeartFill /><span>Bài viết</span>
                    </NavLink>  
                </li>

                <li onClick={handleClick}>
                    <NavLink
                        className={({ isActive }) => isActive ? "active" : ""}
                        to="user"
                    >
                        <FaUser /><span>Quản lý thành viên</span>
                    </NavLink>
                </li>
                <li onClick={handleClick}>
                    <NavLink
                        className={({ isActive }) => isActive ? "active" : ""}
                        to="category"
                    >
                        <TbCategory2 /><span>Quản lý danh mục</span>
                    </NavLink>
                </li>
            </ul>
        </nav >

    )
}
