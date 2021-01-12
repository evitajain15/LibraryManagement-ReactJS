import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {getBooks, deleteBook} from '../../actions/authentication';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class ViewBook extends Component{

    constructor(props){
        super(props);
        this.state ={
            search: '',
            status: true
        }
    }

    updateSearch(event){

        this.setState({
            search: event.target.value.toLowerCase().substr(0,20)
        });
    }

    deleteBook(event,_id,book_name) {
        event.preventDefault();
        if (
            window.confirm(
                `Do you want to delete  ${book_name} book permanently?`,
            )
        ){   
            this.props.deleteBook(_id);
            this.props.getBooks();
       } 
    }

    componentDidMount(){
        this.props.getBooks();

    }

    activeBook(event,_id,status){
        event.preventDefault();
        
        const activeBook = {
            status: !status
        };

        axios.put('/api/library/activeBook/'+ _id, activeBook)
            .then(res => {
                    this.props.getBooks();
                });
        
        
    }

    render() {
        const viewBook = this.props.books.viewBook.filter(
            (el) =>
            {
                // return Object.keys(el).some(key =>
                //     el[key].toString().toLowerCase().includes(this.state.search.toLowerCase())
                //   );
                return Object.keys(el).some(key => el[key].toString().toLowerCase().search(this.state.search.toLowerCase()) !== -1);
            }
        );


        return(

                <div>
                    
                    <input type="text"
                    className="float-right searchBox"
                    placeholder="Search for..."
                    value={this.state.search}
                    onChange = {this.updateSearch.bind(this)}
                    />
                        
                    <table className="table table-hover table-bordered view-book">
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                {/* <th>Book Id</th> */}
                                <th>Book Name</th>
                                <th>Book Category</th>
                                <th>Quantity</th>
                                <th>Action</th>
                            </tr> 
                        </thead>
                        <tbody>
                        
                            {viewBook.map((el) => {
                            return  <tr className="firstrow" key={el._id}>
                                        <td className="sno"></td>
                                        {/* <td>{el.book_id}</td> */}
                                        <td>{el.book_name.charAt(0).toUpperCase() + el.book_name.substring(1)}</td>
                                        <td>{el.book_cat.charAt(0).toUpperCase() + el.book_cat.substring(1)}</td>
                                        <td>{el.quantity}</td>
                                        <td><Link   to={"/editBook/" + el._id} 
                                                    className="far fa-edit editBook"
                                                    title="Edit Book"
                                            >
                                            </Link>
                                            <Link to='/' 
                                                onClick={ (event) => this.deleteBook(event,el._id, el.book_name) } 
                                                className="far fa-trash-alt deleteBook"
                                                title="Delete Book"
                                            >
                                            </Link>
                                            <Link to={"/viewBookDetail/" + el._id} 
                                                className="fas fa-address-book detailBook"
                                                title="Book Detail"
                                            >
                                            </Link>
                                            <button  
                                                onClick={ (event) => this.activeBook(event,el._id,el.status) } 
                                                className={el.status === true ? "fas fa-eye activeElement": "fas fa-eye-slash activeElement"}
                                                title={el.status === true ? "Active" : "Deactive"}
                                            >
                                            </button>
                                        </td>
                                    </tr>
                            })}
                                        
                        </tbody>
                    </table>
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
    mapStateToProps,
    {getBooks,deleteBook}
  )(withRouter(ViewBook));