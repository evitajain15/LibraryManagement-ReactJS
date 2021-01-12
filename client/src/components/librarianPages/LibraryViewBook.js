import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {getBooks} from '../../actions/authentication';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class LibraryViewBook extends Component {
    constructor(props){
        super(props);
        this.state = {
            search: ''
        }
    }

    updateSearch(event){

        this.setState({
            search: event.target.value.toLowerCase().substr(0,20)
        });
    }

    componentDidMount(){
        this.props.getBooks();
    }

    render() {
        const viewBook = this.props.books.viewBook.filter(
            (el) =>
            {
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
                                        <td><Link   to={"/libraryEditBook/" + el._id}  
                                                    className="far fa-edit editBook">
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
    {getBooks}
  )(withRouter(LibraryViewBook));
// export default LibraryViewBook;