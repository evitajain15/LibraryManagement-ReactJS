import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ViewBookCat from '../adminPages/ViewBookCat';

class CategoryManage extends Component {

    render() {

        return (

            <div className="container">
                <div className="row">
                    <div className="col-md-12 bookadd">
                        <Link to='/addCategory' 
                            className="fas fa-plus btn btn-primary float-right">
                                ADD CATEGORY
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <ViewBookCat />
                    </div>
                </div>
            </div>
        )
    }
}

export default CategoryManage;