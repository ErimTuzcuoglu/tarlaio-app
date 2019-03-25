import React, { Component } from 'react';
import { pieChart } from '../component/pieChart';
import { connect } from 'react-redux'
import { getPosts, getUsers } from '../../controller/utils/api';
import * as actions from '../../controller/actions/actions';
import UserTable from '../component/table';
import Container from '../component/container';
import GoogleMaps from '../component/googleMaps';

class HomePage extends Component {

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getPosts())
        dispatch(getUsers())
    }

    componentDidUpdate(prevProps) {
        const { posts, users, dispatch } = this.props;
        if ((prevProps.posts !== posts) && (prevProps.users !== users)) {
            dispatch(getPosts())
            dispatch(getUsers())
        }
    }

    triggerPieChart(posts, users) {
        pieChart(posts, users, "#chart")
    }
    getSelectedUsers = (comingUsers) => {
        var selectedUsers = []
        var userLocation = []
        const { users } = this.props;
        //console.log(comingUsers)
        if (comingUsers.length !== 0) {
            comingUsers.forEach((item) => {
                for (let i = 0; i < users.length; i++) {
                    if ((item + 1) === users[i].id) {
                        selectedUsers.push(users[i])
                        userLocation.push([users[i].name, users[i].address.geo.lat, users[i].address.geo.lng])
                    }
                }
            })
            this.props.dispatch(actions.getUserLocationData(userLocation))
            this.triggerPieChart(this.props.posts, selectedUsers)
        }
    }


    render() {
        const { posts, users } = this.props;
        if (posts && users) { this.triggerPieChart(posts, users) }
        return (
            <>
                <Container title="tarla.io" style={styles.topStyle} />
                <div style={styles.divStyle}>
                    <Container title="User Locations" style={styles.mapContainerStyle} >
                        <GoogleMaps />
                    </Container>
                    <Container title="Posts Percentage" style={styles.chartContainerStyle} >
                        <div id="chart" style={styles.chartStyle} />
                    </Container>
                </div>
                <Container title="User Table" style={styles.userTableStyle} >
                    <div style={{ marginTop: '3%' }}>
                        {users ? <UserTable users={users} getSelected={this.getSelectedUsers} /> : ""}
                    </div>
                </Container>
            </>
        );
    }
}

const styles = {
    topStyle: {
        backgroundColor: '#000000',
        height: '5%',
        color: 'white',
        padding: 0,
    },
    divStyle: {
        marginTop: '3%',
        marginLeft: '5%',
        marginRight: '5%',
        //height: '60%', 
    },
    chartContainerStyle: {
        width: '55%',
        float: 'right',
        marginLeft: '3%',
        height: '85%'
    },
    chartStyle : { 
        height: '100%', 
        width: '75%', 
        fontSize: 12, 
        marginLeft: 'auto', 
        marginRight: 'auto' 
    },
    mapContainerStyle: {
        width: '35%',
        float: 'left',
        height: '85%'
    },
    userTableStyle: {
        position: 'relative',
        margin: '5%',
    }
}

const mapStateToProps = state => {
    const { posts, users } = state
    return {
        posts,
        users
    }
}

export default connect(mapStateToProps)(HomePage)