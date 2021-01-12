import React, {Component} from 'react';
import {getBooks} from '../../actions/authentication';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class DbAdmin extends Component{

    componentDidMount(){
        this.props.getBooks();
    }

    render(){

        const bookCount = this.props.books.viewBook.length;

        return(
            <div className="dashboard">
                <div className="row">
                    <div className="col-md-4">
                        <div className="db1">
                            <h4>Total No.of books</h4>
                            <p>{bookCount}</p>
                        </div>
                    </div>
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
    {getBooks}
  )(withRouter(DbAdmin));
