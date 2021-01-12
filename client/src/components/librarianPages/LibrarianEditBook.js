import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {getBookCat} from '../../actions/authentication';

class LibarayEditBook extends Component{

    constructor(props){
        super(props);
        this.state={
            book_id: "",
            book_name: "",
            author_name: "",
            book_cat: "",
            quantity: "",
            status:""
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
                  book_id: res.data.book_id, 
                  book_name: res.data.book_name,
                  author_name: res.data.author_name,
                  book_cat: res.data.book_cat,
                  quantity: res.data.quantity,
                  status: res.data.status
                });
            })
            .catch((err) =>{
                console.log(err);
            })
      }

    onSubmit(e) {
        e.preventDefault();
        const viewBook = {
            quantity: this.state.quantity,
            editedBy: this.props.auth.user
        };
        
        axios.put('/api/library/updateBook/'+this.props.match.params.id, viewBook)
            .then(res => console.log(res.data));
        
        this.props.history.push('/librarian_book_manage');
      }
     

    render(){
        

        return(
            <form onSubmit={this.onSubmit}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header bg-success text-white">
                                    <strong>EDIT BOOK</strong>
                                </div>
                                <div className="card-body">
                                    <table className="table table-striped">
                                        <tbody>
                                            <tr>
                                                <td>BOOK ID</td>
                                                <td>{this.state.book_id}</td>
                                            </tr>
                                            <tr>
                                                <td>BOOK NAME</td>
                                                <td>{this.state.book_name}</td>
                                            </tr>
                                            <tr>
                                                <td>BOOK CATEGORY</td>
                                                <td>{this.state.book_cat}</td>
                                            </tr>
                                            <tr>
                                                <td>AUTHOR NAME</td>
                                                <td>{this.state.author_name}</td>
                                            </tr>
                                            <tr>
                                                <td>QUANTITY</td>
                                                <td><input type="number" 
                                                        onChange={this.onChange} 
                                                        min="1" 
                                                        className="form-control" 
                                                        id="quantity" 
                                                        placeholder="Quantity" 
                                                        name="quantity"
                                                        value={this.state.quantity}
                                                /></td>
                                            </tr>
                                            <tr>
                                                <td>STATUS</td>
                                                <td>{this.state.status === true ? "Active" : "Inactive"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="library-updateBtn">
                                <button type="submit" className="btn btn-success">Update Book</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    books: state.books
});


export default connect(
    mapStateToProps,
    {getBookCat}
  )(withRouter(LibarayEditBook));