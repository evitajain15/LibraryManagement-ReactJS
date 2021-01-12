import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import ViewUsers from '../adminPages/ViewUsers';

class UserManage extends Component {

    render() {

        return (

            <div className="container">
                {/* <div className="row">
                    <div className="col-md-12 bookadd">
                        <Link to='/addBook' 
                            className="fas fa-plus btn btn-primary float-right">
                                ADD BOOK
                        </Link>
                    </div>
                </div> */}
                <div className="row">
                    <div className="col-md-12">
                        <ViewUsers />
                    </div>
                </div>
            </div>
        )
    }
}

export default UserManage;