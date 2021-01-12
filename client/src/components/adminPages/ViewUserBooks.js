import React, { Component } from 'react';
import {getIssuedBooks} from '../../actions/authentication';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class ViewUserBooks extends Component {

    componentDidMount(){
        this.props.getIssuedBooks();
    }

    render(){

        this.books = this.props['books']['issuedBooks']['issuebooks']

        if( this.props['books'] && this.props['books']['issuedBooks'] && this.props['books']['issuedBooks']['issuebooks'] ){
            var issuedBookuser = [];
            this.books.forEach(obj1 => {
                this.obj = obj1;
        
                if(this.props.match.params.id === this.obj.users._id ){
                    issuedBookuser.push( this.obj);
                }
            });
        }
        
        return(

            <div>
                
                <table className="table table-hover table-bordered view-book">
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Book Id</th>
                                <th>Book Name</th>
                                <th>Author Name</th>
                                <th>Issue Date</th>
                                <th>Return Date</th>
                            </tr> 
                        </thead>
                        <tbody>
                            
                            {issuedBookuser && issuedBookuser.map((el) => {
                            return  <tr className="firstrow" key={el.books._id}>
                                        <td className="sno"></td>
                                        <td>{el.books.book_id}</td>
                                        <td>{el.books.book_name.charAt(0).toUpperCase() + el.books.book_name.substring(1)}</td>
                                        <td>{el.books.author_name.charAt(0).toUpperCase() + el.books.author_name.substring(1)}</td>
                                        <td>{el.issueDate}</td>
                                        <td>{el.returnDate}</td>
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
    {getIssuedBooks}
  )(withRouter(ViewUserBooks));