import React, { Component } from 'react'
import { fetchUser, fetchPostsAndUsers } from '../actions'
import { connect } from 'react-redux'

class UserHeader extends Component {
    componentDidMount() {
        this.props.fetchUser(this.props.userId)
    }
    render() {
        // console.log(this.props.users);
        // const user = this.props.users.find((user) => user.id === this.props.userId)

        // rather then passing the whole user array ,just pass the matched user only by find it in the mapStateToProps fn
        const user = this.props.user
        return (
            <div className='header'>
                {user && user.name}
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        // user: state.users
        user: state.users.find((user) => user.id === props.userId)
    }
}

export default connect(mapStateToProps, { fetchUser: fetchUser })(UserHeader)