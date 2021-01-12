import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import { logoutUser } from '../../actions/authentication';
import { withRouter } from 'react-router-dom';
import { bookcategory } from '../../actions/authentication';


class BookCategory extends Component{
    
    
    constructor(props){
        super(props);

        this.state={
            book_cat: ""
        }
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
    
    onSubmit = e => {
        e.preventDefault();
        const addBook_cat = {
            book_cat: this.state.book_cat
        };
        this.props.bookcategory(addBook_cat, this.props.history);
    };

    render(){
        return(              <div className="bookCat" >
                <div className="row">
                    <div className="col-md-12">
                        <form onSubmit={this.onSubmit}>
                         
                            <div className="form-group">
                                <input type="text" 
                                    onChange={this.onChange}
                                    className="form-control" 
                                    id="book_cat" 
                                    placeholder="Book Category" 
                                    name="book_cat"
                                    value={this.state.book_cat}
                                />
                            </div>
                            <button type="submit" className="btn btn-success">Add Book Category</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

BookCategory.propTypes = {
    bookcategory: PropTypes.func.isRequired,
    //logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{bookcategory})(withRouter(BookCategory));