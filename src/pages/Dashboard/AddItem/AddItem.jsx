import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const img_hosting_token = import.meta.env.VITE_images_upload_token
const AddItem = () => {

    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`
    const onSubmit = data => {
        const formData = new FormData();
        formData.append("image", data.image[0]);

        fetch(img_hosting_url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if(result.success){
                    const imgURL = result.data.display_url;
                    const { name, description, price, category, recipe } = data;
                    const newItem = {
                        image: imgURL,
                        name,
                        description,
                        price: parseFloat(price),
                        category,
                        recipe
                    }
                    console.log(newItem);
                    axiosSecure.post('/menu', newItem)
                        .then(res => {
                            console.log(res.data);
                            if(res.data.insertedId){
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Item Added',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                    
                }
            })
    };

    return (
        <div className="w-full px-10">
            <SectionTitle heading={"What's new"} subHeading={"Add an Item"}></SectionTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text">Recipe Name*</span>

                    </label>
                    <input type="text" {...register("name", { required: true, maxLength: 120 })} placeholder="Recipe Name" className="input input-bordered w-full " />

                    
                </div>
                <div className="flex gap-4 mb-4">
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Category*</span>

                            </label>
                            <select defaultValue={''} {...register("category", { required: true })} className="select select-bordered">
                                <option disabled >Category*</option>
                                <option>Pizza</option>
                                <option>Soup</option>
                                <option>Salad</option>
                                <option>Drinks</option>
                                <option>Dessert</option>
                            </select>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input type="number" {...register("price", { required: true })} placeholder="Type here" className="input input-bordered w-full " />
                        </div>

                    </div>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Recipe Details*</span>
                        </label>
                        <textarea {...register("description", { required: true })} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>

                    </div>

                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Item Image*</span>

                        </label>
                        <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full " />

                    </div>
                    <input className="btn btn-sm mt-4" type="submit" value={"Add Item"} />
            </form>
        </div>
    );
};

export default AddItem;
