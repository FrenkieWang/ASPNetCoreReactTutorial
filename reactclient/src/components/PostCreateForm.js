import React, { useState } from 'react';
import Constants from '../utilities/Constants';

export default function PostCreateForm(props) {

    const initialFormData = Object.freeze({
        title: "Post x",
        content: "This is post x and it has some very interesting content. I have also liked the video and subscribed."
    });

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const postToCreate = {
            postId: 0,
            title: formData.title,
            content: formData.content
        };

        const url = Constants.API_URL_CREATE_POST;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postToCreate)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });

        props.onPostCreated(postToCreate);
    };

    return (
        <form className="w-100 px-5">
            <h1 className="mt-5">Create new Post</h1>

            <div className="mt-5">
                <label className="h3 form-label">Post title</label>
                <input value={formData.title} name="title" type="text" className="form-control" onChange={handleChange}></input>
            </div>

            <div className="mt-4">
                <label className="h3 form-label">Post title</label>
                <input value={formData.content} name="content" type="text" className="form-control" onChange={handleChange}></input>
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Submit</button>
            <button onClick={() => props.onPostCreated(null)} className="btn btn-secondary btn-lg w-100 mt-3">Cancel</button>
        </form>
    )
}

// ... 扩展运算符 https://blog.51cto.com/u_15047484/4234377
// EVENT TARGET https://juejin.cn/s/event.target.name%20event.target.value
// [name] https://stackoverflow.com/questions/50376353/why-we-need-to-put-e-target-name-in-square-brackets
