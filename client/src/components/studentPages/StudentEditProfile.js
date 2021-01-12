import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authentication';

class StudentEditProfile extends Component{

    constructor(props){
        super(props);
        this.state={
            name: "",
            email: "",
            gender: "",
            phoneNo: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = e => {
        this.setState({ 
            [e.target.id]: e.target.value 
        });
    };
    
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    componentDidMount() {

        axios.get('/api/library/editUser/'+this.props.match.params.id)
            .then(res => {
                this.setState({ 
                    name: res.data.name,
                    email: res.data.email,
                    gender: res.data.gender,
                    phoneNo: res.data.phoneNo
                });
            })
            .catch((err) =>{
                console.log(err);
            })
      }

    onSubmit(e) {
    e.preventDefault();
    const updateUser = {
        name: this.state.name,
        email: this.state.email,
        gender: this.state.gender,
        phoneNo: this.state.phoneNo
    };
    
    axios.put('/api/library/updateProfile/'+this.props.match.params.id, updateUser)
        .then(res => console.log(res.data));
    
        this.props.logoutUser(this.props.history);
    }

    render(){
        return(
            <form onSubmit={this.onSubmit}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header bg-primary text-white">
                                    <strong>EDIT USER PROFILE</strong>
                                </div>
                                <div className="card-body">
                                    <table className="table table-striped">
                                        <tbody>
                                            <tr>
                                                <td>USER NAME</td>
                                                <td>
                                                    <input type="text" 
                                                            onChange={this.onChange}
                                                            className="form-control" 
                                                            id="name" 
                                                            placeholder="Name" 
                                                            name="name"
                                                            value={this.state.name}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>EMAIL</td>
                                                <td>
                                                    <input  type="email" 
                                                            onChange={this.onChange}
                                                            className="form-control" 
                                                            id="email" 
                                                            placeholder="Email" 
                                                            name="email"
                                                            value={this.state.email}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>GENDER</td>
                                                <td>
                                                    <select  type="text" 
                                                            onChange={this.onChange}
                                                            className="form-control" 
                                                            id="gender" 
                                                            placeholder="Gender" 
                                                            name="gender"
                                                            value={this.state.gender}
                                                    >
                                                        <option>Male</option>
                                                        <option>Female</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>PHONE NO.</td>
                                                <td>
                                                    <input  type="number" 
                                                            onChange={this.onChange}
                                                            className="form-control" 
                                                            id="phoneNo" 
                                                            placeholder="Phone No." 
                                                            name="phoneNo"
                                                            value={this.state.phoneNo}
                                                    />
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
                            <div className="library-updateBtn">
                                <button type="submit" className="btn btn-success">UPDATE USER</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

StudentEditProfile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    books: state.books
});


export default connect(
    mapStateToProps,
    {logoutUser}
  )(withRouter(StudentEditProfile));