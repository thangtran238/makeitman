import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditUserInfor = () => {
    const [fullName, setFullName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    const [website, setWebsite] = useState('');


    const today = () => {
        const now = new Date();
        const dd = String(now.getDate()).padStart(2, '0');
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const yyyy = now.getFullYear();
        return `${yyyy}-${mm}-${dd}`;
    };


    const getUserData = () => {
        var obtainerId = sessionStorage.getItem('obtainer_id');
        axios
            .get(`http://127.0.0.1:8000/api/get-obtainer/${obtainerId}`)
            .then(response => {
                const { full_name, date_of_birth, phone_number, bio, location, website } = response.data;
                setFullName(full_name);
                setDateOfBirth(date_of_birth);
                setPhoneNumber(phone_number);
                setBio(bio);
                setLocation(location);
                setWebsite(website);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleChange = e => {
        const { name, value } = e.target;
        switch (name) {
            case 'fullName':
                setFullName(value);
                break;
            case 'dateOfBirth':
                setDateOfBirth(value);
                break;
            case 'phoneNumber':
                setPhoneNumber(value);
                break;
            case 'bio':
                setBio(value);
                break;
            case 'location':
                setLocation(value);
                break;
            case 'website':
                setWebsite(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        var obtainerId = sessionStorage.getItem('obtainer_id');
        axios
            .put(`http://127.0.0.1:8000/api/put-obtainer/${obtainerId}`, {
                full_name: fullName,
                date_of_birth: dateOfBirth,
                phone_number: phoneNumber,
                bio: bio,
                location: location,
                website: website,
            })
            .then(response => {
                console.log(response.data);
                alert('Profile updated successfully');
                window.location.href=`/profile-page/${obtainerId}`
            })
            .catch(error => {
                console.log(error);
                alert('An error occurred while updating the profile');
            });
    };

    useEffect(() => {
        getUserData();
        today();
    }, []);

    return (
        <div className="container">
            <h2 className='text-center'>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={fullName}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={dateOfBirth}
                        id="datefield"
                        max={today()}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Bio:</label>
                    <input
                        type="text"
                        name="bio"
                        value={bio}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={location}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Website:</label>
                    <input
                        type="text"
                        name="website"
                        value={website}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn text-center btn-primary">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditUserInfor;
