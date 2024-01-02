import { useAuth } from "../AuthContext";

const HomePage = () => {
    const { user, logout } = useAuth();

    return (<>
        {user ? `You are logged in as ${user.username}` : 'You are not logged in'}
        { 
            user ? 
                <div>
                    <p onClick={logout}>Log Out</p>
                </div>
            :
                <div>
                    <a href="/signup">Sign Up</a>
                    <a href="/login">Log In</a>
                </div>
        }
        <h1>Project Broolyn</h1>
        <div style={{width: 1200, height: 600, backgroundColor: 'gray'}}>
            game
        </div>
    </>)
};

export default HomePage;