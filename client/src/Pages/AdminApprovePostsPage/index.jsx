import React, { useEffect, useState } from 'react'
import "./style.css"
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { TableModal } from '../../components/TableModal';
import ReactPaginate from 'react-paginate';
import { updateStatusPostById } from '../../actions/article.action';



export const AdminApprovePostsPage = () => {
    const dispatch = useDispatch();
    const article = useSelector(state => state.article)

    useEffect(() => {
        // // if (!hasFetchedData) {
        // const userString = localStorage.getItem('user');
        // const userObject = JSON.parse(userString);
        // dispatch(getPostsByUser());
        // setHasFetchedData(true);
        // }
    }, [dispatch]);


    const titleTable = ["Tiêu đề", "Tác giả", "Trạng thái", "Xử lý"]

    const modifiedPost = article?.postForUser?.posts?.map(_post => {
        const showbtn = <button className='btn btn-info border-black fs-5 text-white' onClick={()=>ClickUpdateStatus(_post._id)}>Phê duyệt</button>;
        const editbtn = <button className='btn btn-warning border-black fs-5 text-white mx-2'>View</button>;
        
        const actionbtn = <div className="d-flex">{showbtn} {editbtn}</div>;
        return {
            title: _post.title,
            publisher: _post.publisher,
            status: _post.status,
            actionbtn
        };
    }) || [];

    const ClickUpdateStatus = (id) => {
        
        dispatch(updateStatusPostById(id, 4))
    }

    // const 

    return (
        <>
            <div className="row">
                {/* <h4 className='mb-5'>Phê duyệt bài viết</h4> */}
    
                <TableModal title={titleTable} data={modifiedPost} />
            
            </div>
        </>
    )
}
