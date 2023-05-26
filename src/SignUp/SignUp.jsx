import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignUp = () => {
    const {createUser, updateUserProfile} = useContext(AuthContext);
    const { register, handleSubmit, reset,  formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = data => {
        console.log(data.email, data.password);
        
        createUser(data.email, data.password)
        .then(result => {
            const user = result.user;
            console.log(user);
            updateUserProfile(data.name, data.photoURL)
            .then(() => {
                reset();
                Swal.fire({
                    title: 'User created successfully',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
                navigate('/');
            })
            .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
    };

    return (
        <>
        <Helmet>
            <title>Bistro | Sign Up</title>
        </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name="name" placeholder="name" className="input input-bordered" />
                                {errors.name && <span className="text-red-500">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photoURL", { required: true })} placeholder="photoURL" className="input input-bordered" />
                                {errors.photoURL && <span className="text-red-500">photoURL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-500">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 12,
                                    pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9)(?=.*[@$!%*?&])/
                                })} type="password" name="password" placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <p className="text-red-500" role="alert">password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-500" role="alert">password must be at least 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-500" role="alert">password must be at most 12 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-500" role="alert">password must contain at least one uppercase and one number</p>}


                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value={"Sign Up"} name="" id="" />
                            </div>
                        </form>
                        <p><small>Already have an account?<Link to="/login">Login</Link></small></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;