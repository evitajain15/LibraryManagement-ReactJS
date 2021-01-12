import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { newbooks,logoutUser, getBookCat } from '../../actions/authentication';
 
class AddBook extends Component{    
    
    constructor(props){
        super(props);

        this.state={
            book_id: "",
            book_name: "",
            author_name: "",
            book_cat: "",
            quantity: "1",
            status: true
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
        const add_book = {
            book_id: this.state.book_id,
            book_name: this.state.book_name,
            author_name: this.state.author_name,
            book_cat: this.state.book_cat,
            quantity: this.state.quantity,
            status: this.state.status
        };
        this.props.newbooks(add_book, this.props.history);
    };

    componentDidMount() {
        
        const {getBookCat} = this.props;
        getBookCat();

      }

    render(){
        const {schema} = this.props.books;

        return(
            <div className="addbooks" >
                <div className="row">
                    <div className="col-md-12">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="number"
                                    min="1" 
                                    onChange={this.onChange}
                                    className="form-control" 
                                    id="book_id" 
                                    placeholder="Book Id" 
                                    name="book_id"
                                    value={this.state.book_id}
                                    />
                            </div>
                            <div className="form-group">
                                <input type="text" 
                                    onChange={this.onChange}
                                    className="form-control" 
                                    id="book_name" 
                                    placeholder="Book Name" 
                                    name="book_name"
                                    value={this.state.book_name}
                                    />
                            </div>
                            <div className="form-group">
                                <input type="text"
                                    onChange={this.onChange} 
                                    className="form-control" 
                                    id="author_name" 
                                    placeholder="Author Name" 
                                    name="author_name"
                                    value={this.state.author_name}
                                    />
                            </div>
                            <div className="form-group">
                                <select type="text" 
                                    onChange={this.onChange}
                                    className="form-control" 
                                    id="book_cat" 
                                    placeholder="Book Category" 
                                    name="book_cat"
                                    value={this.state.book_cat}
                                >   
                                  
                                  {
                                      schema.length > 0 && schema.map((el) =>{
                                        return <option key={el}>{el}</option>
                                      })
                                  }
                                </select>
                            </div>
                            <div className="form-group">
                                <input type="number" 
                                    onChange={this.onChange} 
                                    min="1" 
                                    className="form-control" 
                                    id="quantity" 
                                    placeholder="Quantity" 
                                    name="quantity"
                                    value={this.state.quantity}
                                    />
                            </div>
                            <div className="form-group">
                                <input type="text" 
                                    onChange={this.onChange} 
                                    min="1" 
                                    className="form-control" 
                                    id="status" 
                                    name="status"
                                    readOnly
                                    value={this.state.status === true ? "Active" : "Inactive"}
                                    />
                            </div>
                            <button type="submit" className="btn btn-success">Add Book</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

AddBook.propTypes = {
    newbooks: PropTypes.func.isRequired,
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
    {newbooks, logoutUser, getBookCat}
  )(withRouter(AddBook));