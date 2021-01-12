import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {issuedBook,logoutUser,getBookCat} from '../../actions/authentication';


class StudentIssueBook extends Component {

    constructor(props){
        super(props);
        this.state={
            _id:"",
            book_id: "",
            book_name: "",
            author_name: "",
            quantity: "1",
            issueDate:"",
            returnDate:""
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
        this.props.getBookCat();

        axios.get('/api/library/editBook/'+this.props.match.params.id)
            .then(res => {
                this.setState({ 
                    _id: res.data._id,
                  book_id: res.data.book_id, 
                  book_name: res.data.book_name,
                  author_name: res.data.author_name,
                  book_cat: res.data.book_cat
                });
            })
            .catch((err) =>{
                console.log(err);
            })

            const today = new Date();
            const month = ((today.getMonth() + 1) < 10 ? '0' : '') + (today.getMonth() + 1)
            const day = ((today.getDate() ) < 10 ? '0' : '') + (today.getDate())
            const date = today.getFullYear()+'-'+ month +'-'+ day;

            const currDate = new Date();
            currDate.setDate(currDate.getDate()+10);
            const returnDay = ((currDate.getDate() ) < 10 ? '0' : '') + (currDate.getDate());
            const returnDate = today.getFullYear()+'-'+ month +'-'+(returnDay);
            
            this.setState({
                issueDate: date,
                returnDate: returnDate
            })
      }

      onSubmit(e) {
        e.preventDefault();
        const issuedBook = {
            _id: this.state._id,
            book_id: this.state.book_id,
            book_name: this.state.book_name,
            author_name: this.state.author_name,
            book_cat: this.state.book_cat,
            quantity: this.state.quantity,
            issueDate: this.state.issueDate,
            returnDate: this.state.returnDate,
            id: this.props.auth.user.id,
            name: this.props.auth.user.name,
            email: this.props.auth.user.email,
            phoneNo: this.props.auth.user.phoneNo
        };
        this.props.issuedBook(issuedBook, this.props.history);
      }

    render(){
        
        return(
           
            <form onSubmit={this.onSubmit}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header bg-success text-white">
                                    <strong>Issue BOOK</strong>
                                </div>
                                <div className="card-body">
                                    <table className="table table-striped">
                                        <tbody>
                                        {/* <tr>
                                                <td> ID</td>
                                                <td>
                                                    <input type="text"
                                                        onChange={this.onChange}
                                                        className="form-control" 
                                                        id="_id" 
                                                        placeholder=" Id" 
                                                        name="_id"
                                                        readOnly
                                                        value={this.state._id}
                                                    />
                                                 </td>
                                            </tr> */}
                                            <tr>
                                                <td>BOOK ID</td>
                                                <td>
                                                    <input type="number"
                                                        min="1" 
                                                        onChange={this.onChange}
                                                        className="form-control" 
                                                        id="book_id" 
                                                        placeholder="Book Id" 
                                                        name="book_id"
                                                        readOnly
                                                        value={this.state.book_id}
                                                    />
                                                 </td>
                                            </tr>
                                            <tr>
                                                <td>BOOK NAME</td>
                                                <td>
                                                    <input type="text" 
                                                        onChange={this.onChange}
                                                        className="form-control" 
                                                        id="book_name" 
                                                        placeholder="Book Name" 
                                                        name="book_name"
                                                        readOnly
                                                        value={this.state.book_name}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>AUTHOR NAME</td>
                                                <td>
                                                    <input type="text"
                                                        onChange={this.onChange} 
                                                        className="form-control" 
                                                        id="author_name" 
                                                        placeholder="Author Name" 
                                                        name="author_name"
                                                        readOnly
                                                        value={this.state.author_name}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>QUANTITY</td>
                                                <td>
                                                    <input type="number" 
                                                        onChange={this.onChange} 
                                                        min="1" 
                                                        className="form-control" 
                                                        id="quantity" 
                                                        placeholder="Quantity" 
                                                        name="quantity"
                                                        readOnly
                                                        value={this.state.quantity}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>ISSUE DATE</td>
                                                <td>
                                                    <input type="date" 
                                                        onChange={this.onChange}
                                                        className="form-control" 
                                                        id="issueDate" 
                                                        placeholder="Issue Date" 
                                                        name="issueDate"
                                                        readOnly
                                                        value={this.state.issueDate}
                                                    />  
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Return DATE</td>
                                                <td>
                                                    <input type="date" 
                                                        onChange={this.onChange}
                                                        className="form-control" 
                                                        id="returnDate" 
                                                        placeholder="Return Date" 
                                                        name="returnDate"
                                                        readOnly
                                                        value={this.state.returnDate}
                                                    />  
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="admin-updateBtn">
                                <button type="submit" className="btn btn-success">Issue Book</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        )
    }
}

StudentIssueBook.propTypes = {
    issuedBook: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    getBookCat: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    books: state.books
});


export default connect(
    mapStateToProps,
    {issuedBook,logoutUser,getBookCat}
  )(withRouter(StudentIssueBook));
