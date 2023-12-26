import { useEffect, useRef, useState } from "react";

//Blogging App using Hooks
export default function Blog() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [blogs, setBlogs] = useState([]);
    const titleRef = useRef(null);
    // Load data from localStorage on component mount
    useEffect(() => {
        const storeBlogs = localStorage.getItem('blogs');
        if (storeBlogs) {
            try {
                const parsedBlogs = JSON.parse(storeBlogs);
                setBlogs(parsedBlogs);
            } catch (error) {
                console.error("Error parsing JSON:", error);
                // Handle the error, perhaps by clearing the invalid data
                localStorage.removeItem('blogs');
            }
        }
    }, []);
    // Save data to localStorage whenever blogs state changes
    useEffect(() => {
        localStorage.setItem('blogs', JSON.stringify(blogs));
    }, [blogs]);
    function handleSubmit(e) {
        e.preventDefault();
        if (title.trim() !== '' && content.trim() !== '') {
            setBlogs([{ title, content }, ...blogs])
            setTitle('');
            setContent('');
            titleRef.current.focus();
        }
    }
    function removeBlog(i) {
        setBlogs(blogs.filter((blog, index) => i !== index));

    }

    return (
        <>
            <h1>Write a Blog!</h1>
            <div className="section">
                <form onSubmit={handleSubmit}> <Row label="Title">
                    <input className="input"
                        placeholder="Enter the Title of the Blog here.."
                        value={title}
                        ref={titleRef}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Row >

                    {/* Row component to create a row for Text area field */}
                    <Row label="Content">
                        <textarea className="input content"
                            placeholder="Content of the Blog goes here.."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Row >

                    {/* Button to submit the blog */}

                    <button className="btn">ADD</button>
                </form>

            </div>

            <hr />

            {/* Section where submitted blogs will be displayed */}
            <h2> Blogs </h2>
            {blogs.map((blog, i) => (
                <div className="blog" key={i}>
                    <h3>{blog.title}</h3>
                    <p>{blog.content}</p>
                    <div className="blog-btn">
                        <button onClick={() => removeBlog(i)} className="btn remove">
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}

//Row component to introduce a new row section in the form
function Row(props) {
    const { label } = props;
    return (
        <>
            <label>{label}<br /></label>
            {props.children}
            <hr />
        </>
    )
}
