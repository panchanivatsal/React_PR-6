import { useEffect, useState } from "react";
import './Style.css'
const Crud = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleOpenForm = () => {
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
    };

    const [input, setInput] = useState({
        name: '',
        email: '',
        password: '',
        city: '',
        salary: '',
    })
    const [alldata, setAlldata] = useState([]);
    const [editid, setEditId] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input, [name]: value
        })
    }

    const handleSubmit = () => {
        if (editid) {
            let ans = alldata.filter((item) => {
                if (item.id == editid) {
                    item.name = input.name;
                    item.email = input.email;
                    item.password = input.password;
                    item.city = input.city;
                    item.salary = input.salary;
                }
                return item
            })
            setAlldata(ans);
            setEditId("");
        } else {
            let obj = {
                id: Math.floor(Math.random() * 10000),
                name: input.name,
                email: input.email,
                password: input.password,
                city: input.city,
                salary: input.salary,
            }
            let data = [...alldata, obj];
            setAlldata(data);
            localStorage.setItem('crud', JSON.stringify(data));
            alert("Record successfully Add");
        }
        setInput({
            name: '',
            email: '',
            password: '',
            city: '',
            salary: '',
        })
    }

    const deleteData = (id) => {
        let ans = alldata.filter((item) => {
            return item.id !== id;
        })
        setAlldata(ans);
        localStorage.setItem('crud', JSON.stringify(ans));
        alert("Record Successfully Delete");
    }
    const editData = (id) => {
        let ans = alldata.filter((item) => {
            return item.id == id;
        })
        setEditId(id);
        setInput(ans[0]);
    }
    useEffect(() => {
        let all = JSON.parse(localStorage.getItem('crud'));
        if (all === null) {
            setAlldata([]);
        } else {
            setAlldata(all);
        }
    }, [])

    return (
        <center>
            {isFormOpen ? (
                <div className="main">
                    <button onClick={handleCloseForm} className="custom-btn btn-16">Close</button>
                    
                    <table>
                        <tbody>
                            <tr>                   
                                <td className="box"><input type="text" placeholder="Enter The Your Name" className="input" name="name" onChange={handleChange} value={input.name} /></td>
                            </tr>
                            <tr>                                
                                <td className="box"><input type="email" placeholder="Enter The Your Emaill " className="input" name="email" onChange={handleChange} value={input.email} /></td>
                            </tr>
                            <tr>                                
                                <td className="box"><input type="password" placeholder="Enter The Your Password" className="input" name="password" onChange={handleChange} value={input.password} /></td>
                            </tr>
                            <tr>                                
                                <td className="box"><input type="text" placeholder="Enter The Your City " className="input" name="city" onChange={handleChange} value={input.city} /></td>
                            </tr>
                            <tr>                                
                                <td className="box"><input type="nubmer" placeholder="Enter The Your Salary" className="input" name="salary" onChange={handleChange} value={input.salary} /></td>
                            </tr>
                            <tr className="pt-2"> 
                                                     
                                <td className="pt-4 xus">
                                    {
                                        editid ? (<input type="button" className="custom-btn btn-13" onClick={() => handleSubmit()} value="Edit" />)
                                            : (<input type="button" className="custom-btn btn-16" onClick={() => handleSubmit()} value="submit" />)
                                    }

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <button onClick={handleOpenForm} className="custom-btn btn-9">ADD</button>
            )}

            <br></br>


            <table className="border border-warning">
                <thead>
                    <tr className="text-center border-bottom border-warning border-3">
                        <th className="col-2">Id</th>
                        <th className="col-2">Name</th>
                        <th className="col-2">Email</th>
                        <th className="col-2">Password</th>
                        <th className="col-2">City</th>
                        <th className="col-2">Salary</th>
                        <th className="col-2">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        alldata.map((item) => {
                            const { id, name, email, password, city, salary } = item;
                            return (
                                <tr key={id} className="text-center border-3 border-bottom border-warning">
                                    <td className="col-2">{id}</td>
                                    <td className="col-2">{name}</td>
                                    <td className="col-2">{email}</td>
                                    <td className="col-2">{password}</td>
                                    <td className="col-2">{city}</td>
                                    <td className="col-2">{salary}</td>
                                    <td>
                                        <button onClick={() => deleteData(id)} className="custom-btn btn-5">Delete</button>
                                        <button onClick={() => editData(id)} className="custom-btn btn-8">Edit</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>

            </table>

        </center>
    )
}

export default Crud;