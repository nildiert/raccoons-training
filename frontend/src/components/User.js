import Login from './Login';
import Logout from './Logout';
import ActiveWeek from './training/ActiveWeek';

const User = ({ currUser, setCurrUser }) => {
    if (currUser) {
        return (
            <div>
                Hello {currUser.email}
                <Logout setCurrUser={setCurrUser} />
                <ActiveWeek currUser={currUser} />
            </div>
        );
    } else {
        return <Login setCurrUser={setCurrUser} />;
    }
};

export default User;
