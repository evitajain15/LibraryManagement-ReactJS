import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {fetchBookCat} from '../../actions/authentication';

class EditBookCat extends Component{

    constructor(props){
        super(props);
        this.state={
            book_cat: ""
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

        axios.get('/api/library/editBookCat/'+this.props.match.params.id)
            .then(res => {
                this.setState({ 
                  book_cat: res.data.book_cat
                });
            })
            .catch((err) =>{
                console.log(err);
            })
      }

    onSubmit(e) {
        e.preventDefault();
        const viewBookCat = {
            book_cat: this.state.book_cat
        };
        axios.put('/api/library/updateBookCat/'+this.props.match.params.id, viewBookCat)
            .then(res => console.log(res.data));
        
        this.props.history.push('/category_manage');
      }
     

    render(){

        return(
           
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
                    <button type="submit" className="btn btn-success">Update Book Category</button>
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
    {fetchBookCat}
  )(withRouter(EditBookCat));