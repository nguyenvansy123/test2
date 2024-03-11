import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { BsThreeDots } from "react-icons/bs";
import { MdBlock, MdDeleteForever } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { getAwaitApproveUser } from '../../actions';
import { NoDataUI } from '../../components/NoDataUI';

export const ListWaitApprovedUsers = ({ ...props }) => {
    const { handleDelete,handleApprove } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAwaitApproveUser());
    }, []);

    const users = useSelector(state => state.user)

    return (
        <>
            <table id="customers">
                <tbody>
                    <tr className='table-header'>
                        <th>Ảnh đại diện </th>
                        <th>Tên</th>
                        <th>Email đăng nhập</th>
                        <th>Vai trò</th>
                        <th>Đăng nhập lần cuối cùng</th>
                        <th></th>
                    </tr>
                    {
                        users?.pendingMemeber.length > 0 ? (users?.pendingMemeber?.map((user, i) =>
                        (
                            <tr key={i}>
                                <td>
                                    <img src="../images/user.png" className='user-avatar' />
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>20/20/2024</td>
                                <td>
                                    <div className="dropdown-box">
                                        <Dropdown>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                <BsThreeDots />
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className='dropdown-content'>
                                                <Dropdown.Item as="button" onClick={() => handleDelete(user.id)} ><MdDeleteForever />Xóa Tài khoản</Dropdown.Item>
                                                <Dropdown.Item as="button" onClick={()=> handleApprove(user.id)}><FaCheck />Phê duyệt tài khoản</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </td>
                            </tr>
                        )))
                            :
                            <tr><td colSpan={6}><NoDataUI content={"Bạn không có thành viên trang web nào chờ được phê duyệt."} /></td></tr>
                    }
                </tbody>
            </table>
        </>
    )
}
