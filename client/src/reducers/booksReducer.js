import { GET_BOOKCAT, GET_BOOKS, DELETE_BOOK, 
    DELETE_BOOKCAT, FETCH_BOOKCAT, GET_ISSUE_BOOKS } from '../actions/types';


const initialState = {
    schema: [],
    viewBook: [],
    bookCat: [],
    issuedBooks: []
}

export default function(state = (initialState), action ) {
    switch(action.type) {  
        case GET_BOOKCAT:
            return {
                ...state, 
                schema: action.payload
            };
        case FETCH_BOOKCAT:
                return {
                    ...state, 
                    bookCat: action.payload
                };
        case GET_BOOKS:
            return{
                ...state,
                viewBook: action.payload
            };
        case DELETE_BOOK:
            return { 
                viewBook: state.viewBook.filter(viewBook =>
                viewBook._id !== action.payload._id )
            };
        case DELETE_BOOKCAT:
            return {
                ...state,
                schema: state.schema.filter(schema =>
                    schema._id !== action.payload._id )
            };
        case GET_ISSUE_BOOKS:
            return{
                ...state,
                issuedBooks: action.payload
            };
        default: 
            return state;
    }
}