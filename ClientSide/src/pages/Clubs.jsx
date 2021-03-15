import React, { Component } from 'react';
import { connect } from 'react-redux';
import Membership from '../cmps/Membership';
import NotFoundPage from '../cmps/NotFoundPage';

class _Clubs extends Component {

    state = {
        memberships: []

    }

    componentDidMount() {
        const { loggedInUser } = this.props
        const memberships = loggedInUser.activeClubs.map(club => club)
        this.setState({ memberships })

    }

    render() {
        const { memberships } = this.state

        if (!memberships.length) return <div className=" main-container schedule-container">
            <NotFoundPage />
        </div>
        return (
            <section className="main-container clubs-container">
                <h2 className="title">My Memberships</h2>
                {memberships.map(ea => <Membership key={ea.id} id={ea.id} exp={ea.expiration} isAdmin={ea.isAdmin} />)}
            </section>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        loggedInUser: state.user.loggedInUser
    };
};
const mapDispatchToProps = {

};


export const Clubs = connect(mapStateToProps, mapDispatchToProps)(_Clubs);


