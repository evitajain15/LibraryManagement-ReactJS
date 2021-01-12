import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchBookCat, deleteBookCat } from '../../actions/authentication';


class ViewBookCat extends Component{

    deleteBookCat(event,_id,book_cat) {
        event.preventDefault();
        if (
            window.confirm(
                `Do you want to delete  ${book_cat} category permanently?`,
            )
        ){   
            this.props.deleteBookCat(_id);
       } 
    }

    componentDidMount() {
        const {fetchBookCat} = this.props;
        fetchBookCat();

    }
    render() {
        const {bookCat} = this.props.books;

        return(

                <div>
                    <input type="text"
                    className="float-right searchBox"
                    placeholder="Search for..."
                    // value={this.state.search}
                    // onChange = {this.updateSearch.bind(this)}
                    />
                        
                    <table className="table table-hover table-bordered view-book">
                        <thead>
                            <tr>
                                <th className="text-center">S.No.</th>
                                <th>Book Category</th>
                                <th>Action</th>
                            </tr> 
                        </thead>
                        <tbody>
                                {bookCat.map((el) =>{
                                    return <tr className="firstrow" key={el._id}>
                                        <td className="sno text-center"></td> 
                                        <td>{el.book_cat.charAt(0).toUpperCase() + el.book_cat.substring(1)}</td>
                                        <td><Link   to={"/editBookCat/" + el._id} 
                                                    className="far fa-edit editBook">
                                            </Link>
                                            <Link to='/' 
                                                onClick={ (event) => this.deleteBookCat(event,el._id, el.book_cat) }
                                                className="far fa-trash-alt deleteBook">
                                            </Link>
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
    {fetchBookCat,deleteBookCat}
  )(withRouter(ViewBookCat));

// export default ViewBookCat;