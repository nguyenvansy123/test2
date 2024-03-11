import React from 'react'
import { ModalUI } from '../ModalUI'

export const AdminFooter = () => {
    return (
        <div className="footer_part">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="footer_iner text-center">
                            <p>
                                2023 © Influence - Designed by{" "}
                                <a href="#">
                                    <i className="ti-heart" />{" "}
                                </a>
                                <a href="#"> Dashboard</a>
                            </p>
                        </div>
                        {/* <ModalUI /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
