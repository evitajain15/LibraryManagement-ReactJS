import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authentication';
import { withRouter } from 'react-router-dom';
import { HashRouter, Route, Switch } from "react-router-dom";
import Sidebar from '../layout/Sidebar';
import DbStudent from '../studentPages/DbStudent';
import StudentBookManage from '../studentPages/StudentBookManage';
import StudentIssueBook from '../studentPages/StudentIssueBook';
import StudentProfile from '../studentPages/StudentProfile';
import StudentEditProfile from '../studentPages/StudentEditProfile';


class DashboardStudent extends Component {
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
                            <h3>Quick Student Actions</h3>
                            <hr/>
                            <Switch>
                                <Route exact path='/' component={DbStudent}/>
                                <Route path='/student_book_manage' component={StudentBookManage}/>
                                <Route path='/issueBook/:id' component={StudentIssueBook} />
                                <Route path='/student_profile' component={StudentProfile} />
                                <Route path='/editUser/:id' component={StudentEditProfile} />
                            </Switch>

                        </div>
                    </div>
                </div>
                </HashRouter>
            </div>
        );
    }
}

DashboardStudent.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps,{ logoutUser })(withRouter(DashboardStudent));