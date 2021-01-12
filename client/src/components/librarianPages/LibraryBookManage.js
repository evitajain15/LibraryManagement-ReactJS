import React, { Component } from 'react';
import { Link } from "react-router-dom";
import LibraryViewBook from '../librarianPages/LibraryViewBook';

class LibraryBookManage extends Component {

    render() {

        return (

            <div className="container">
                <div className="row">
                    <div className="col-md-12 bookadd">
                        <Link to='/libraryAddBook' 
                            className="fas fa-plus btn btn-primary float-right">
                                ADD BOOK
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <LibraryViewBook />
                    </div>
                </div>
            </div>
        )
    }
}

export default LibraryBookManage;