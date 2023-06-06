import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure();
    
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users');
        return res.data;
    })

    const handleDelete = (id) => {
        console.log(id);
        
    }

    const handleAdmin = (user) => {
        console.log(user);
        fetch(`https://bistro-boss-server-shiamhub.vercel.app/user/admin/${user._id}`, {
            method: 'PATCH',
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount) {
                refetch();
                Swal.fire({
                    
                    position: 'center',  
                    icon: 'success',
                    title: `${user.name} is Admin`,
                    showConfirmButton: false,
                    timer: 1500
                }
                )
            }
        })
    }

    return (
        <div className="w-full">
            <Helmet>
                <title>Bistro | All Users</title>
            </Helmet>
            <h3 className="text-3xl font-semibold my-4">Total Users: {users.length}</h3>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, i) => <tr key={user._id}>
                            <th>{i + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role === 'admin' ? 'Admin' : <button onClick={() => handleAdmin(user)} className="btn btn-ghost bg-orange-600 text-white"><FaUserShield></FaUserShield></button>}</td>
                            <td>
                            <button onClick={() => handleDelete(user._id)} className="btn btn-ghost bg-red-600 text-white"><FaTrashAlt></FaTrashAlt></button>
                            </td>
                        </tr>)
                        }
                        
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;