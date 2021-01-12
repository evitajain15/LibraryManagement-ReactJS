import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import {getBooks} from '../../actions/authentication';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class ViewBookDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            book_id: "",
            book_name: "",
            author_name: "",
            book_cat: "",
            quantity: "",
            status: ""
        }
    }

    componentDidMount(){

        axios.get('/api/library/viewBookDetail/'+this.props.match.params.id)
            .then(res => {
                this.setState({ 
                  book_id: res.data.book_id, 
                  book_name: res.data.book_name,
                  author_name: res.data.author_name,
                  book_cat: res.data.book_cat,
                  quantity: res.data.quantity,
                  status: res.data.status,
                  editedBy: res.data.editedBy.name
                });
            })
            .catch((err) =>{
                console.log(err);
            })
    }

    render() {
        
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header bg-success text-white"><strong>VIEW BOOK DETAILS</strong></div>
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
                                            <td>{this.state.quantity}</td>
                                        </tr>
                                        <tr>
                                            <td>EDITED BY</td>
                                            <td>{this.state.editedBy}</td>
                                        </tr>
                                        <tr>
                                            <td>STATUS</td>
                                            <td>{this.state.status.toString()}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state,props)=> ({
    auth: state.auth,
    errors: state.errors,
    books: state.books
});


export default connect(
    mapStateToProps,
    {getBooks}
  )(withRouter(ViewBookDetail));