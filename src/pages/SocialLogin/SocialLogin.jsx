import { FaGoogle } from 'react-icons/fa';
// import { AuthContext } from '../../providers/AuthProvider';
// import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const SocialLogin = () => {
    const { loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleGoogleLogin = () => {
        loginWithGoogle()
            .then(result => {
                const user = result.user;
                const saveUser = { name: user.displayName, email: user.email };

                fetch('https://bistro-boss-server-shiamhub.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true });
                    })

            })
            .catch(error => console.error(error));
    }
    return (
        <div>
            <div className="divider"></div>
            <div className='w-full text-center my-8'>
                <button onClick={handleGoogleLogin} className="btn btn-circle btn-outline">
                    <FaGoogle></FaGoogle>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;