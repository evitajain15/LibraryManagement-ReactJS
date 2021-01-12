import React, {Component} from 'react';
import StudentViewBook from '../studentPages/StudentViewBook';


class StudentBookManage extends Component{

    render(){
        return(
            <div className="container">
                {/* <div className="row">
                    <div className="col-md-12 bookadd">
                        <Link to='/libraryAddBook' 
                            className="fas fa-plus btn btn-primary float-right">
                                ADD BOOK
                        </Link>
                    </div>
                </div> */}
                <div className="row">
                    <div className="col-md-12">
                        <StudentViewBook />
                    </div>
                </div>
            </div>

        )
    }
}

export default StudentBookManage;