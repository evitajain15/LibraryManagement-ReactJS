import React, {Component} from 'react';
import {getIssuedBooks} from '../../actions/authentication';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class DbStudent extends Component{

    componentDidMount(){
        this.props.getIssuedBooks();
    }

    render(){
        this.books = this.props['books']['issuedBooks']['issuebooks']

        if( this.props['books'] && this.props['books']['issuedBooks'] && this.props['books']['issuedBooks']['issuebooks'] ){
            var issuedBookuser = [];
            this.books.forEach(obj1 => {
                this.obj = obj1;
                if(this.obj.users._id === this.props.auth.user.id ){
                    issuedBookuser.push(this.obj.books)
                }
            });
       
            // console.log('test', issuedBookuser)
        }
        
        return(
            
            <div className="dashboard">
                <div className="row">
                <table className="table table-hover table-bordered view-book">
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Book Id</th>
                                <th>Book Name</th>
                                <th>Author Name</th>
                                <th>Quantity</th>
                            </tr> 
                        </thead>
                        <tbody>
                        
                            {issuedBookuser && issuedBookuser.map((el) => {
                            return  <tr className="firstrow" key={el._id}>
                                        <td className="sno"></td>
                                        <td>{el.book_id}</td>
                                        <td>{el.book_name.charAt(0).toUpperCase() + el.book_name.substring(1)}</td>
                                        <td>{el.author_name.charAt(0).toUpperCase() + el.author_name.substring(1)}</td>
                                        <td>{el.quantity}</td>
                                    </tr>
                            })}
                                        
                        </tbody>
                    </table>
                </div>
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
  )(withRouter(DbStudent));