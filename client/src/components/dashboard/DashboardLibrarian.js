import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authentication';
import { withRouter } from 'react-router-dom';
import { HashRouter, Route, Switch } from "react-router-dom";
import Sidebar from '../layout/Sidebar';
import DbLibrarian from '../librarianPages/DbLibrarian';
import LibraryBookManage from '../librarianPages/LibraryBookManage';
import LibraryViewBook from '../librarianPages/LibraryViewBook';
import LibraryEditBook from '../librarianPages/LibrarianEditBook';
import LibraryAddBook from '../librarianPages/LibrarianAddBook';
import LibrarianProfile from '../librarianPages/LibrarianProfile';
import LibrarianEditProfile from '../librarianPages/LibrarianEditProfile';

class DashboardLibrarian extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
      };

    render(){

        return(
            <div className="container-fluid pl-0">
                <HashRouter>
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="dashboard-rightbar">
                            <h3>Quick Librarian Actions</h3>
                            <hr/>
                            <Switch>
                                <Route exact path='/' component={DbLibrarian}/>
                                <Route path='/librarian_book_manage' component={LibraryBookManage}/>
                                <Route path='/libraryViewBook' component={LibraryViewBook}/>
                                <Route path='/libraryEditBook/:id' component={LibraryEditBook} />
                                <Route path='/libraryAddBook' component={LibraryAddBook} />
                                <Route path='/librarian_profile' component={LibrarianProfile} />
                                <Route path='/editUser/:id' component={LibrarianEditProfile} />
                            </Switch>

                        </div>
                    </div>
                </div>
                </HashRouter>
            </div>
        );
    }
}

DashboardLibrarian.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps,{ logoutUser })(withRouter(DashboardLibrarian));