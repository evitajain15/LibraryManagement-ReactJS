import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";

class StudentProfile extends Component {

    onChange = e => {
        this.setState({ 
            [e.target.id]: e.target.value 
        });
    };
    

    render(){
            console.log(this.props)
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12 editUser">
                        <Link to={"/editUser/" + this.props.auth.user.id} 
                            className="far fa-edit btn btn-success float-right">
                                &nbsp;&nbsp;EDIT USER PROFILE
                        </Link>
                    </div>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header bg-primary text-white">
                                        <strong>USER PROFILE</strong>
                                    </div>
                                    <div className="card-body">
                                        <table className="table table-striped">
                                            <tbody>
                                                <tr>
                                                    <td>USER NAME</td>
                                                    <td>
                                                        {this.props.auth.user.name}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>EMAIL</td>
                                                    <td>
                                                        {this.props.auth.user.email}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>GENDER</td>
                                                    <td>
                                                        {this.props.auth.user.gender}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>PHONE NO.</td>
                                                    <td>
                                                        {this.props.auth.user.phoneNo}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>ROLE</td>
                                                    <td>
                                                        {this.props.auth.user.role}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    books: state.books
});


export default connect(
    mapStateToProps
  )(withRouter(StudentProfile));
// export default StudentProfile;