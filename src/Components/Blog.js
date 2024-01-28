import {useEffect, useRef, useState } from "react";
import { db } from "../firebaseInit";
import { doc, setDoc, getDoc, onSnapshot,collection, deleteDoc } from "firebase/firestore";
//Blogging App using Hooks
export default function Blog() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [blogs, setBlogs] = useState([]);
    const titleRef = useRef(null);

    useEffect(() =>{
        titleRef.current.focus();
    },[]);
    useEffect(() => {
        if (blogs.length && blogs[0].title) {
          document.title = blogs[0].title;
        } else {
          document.title = "No blogs!";
        }
      }, [blogs]);

      useEffect(()=>{
        const unsub = onSnapshot(collection(db, "blogs"), (snapShot) => {
          const blogs = snapShot.docs.map((doc)=>{
                  return{
                    id: doc.id,
                    ...doc.data()
                  }
              })
              setBlogs(blogs)
      });
      
      },[]);

    async function handleSubmit(e) {
        e.preventDefault();
        if (title.trim() !== '' && content.trim() !== '') {
            await setDoc(doc(db, "blogs", title), {
                title: title,
                content: content,
                createdOn: new Date()
            });
            // setBlogs([{ title, content }, ...blogs])
            setTitle('');
            setContent('');
            titleRef.current.focus();
        }
    }
     async function removeBlog(id) {
        await deleteDoc(doc(db, 'blogs', id))
        setBlogs(blogs);

    }

    return (
        <>
            <h1>Write a Blog!</h1>
            <div className="section">
                <form onSubmit={handleSubmit}> 
                <Row label="Title">
                    <input className="input"
                    type="text"
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
                        <button onClick={() => removeBlog(blog.id)} className="btn remove">
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
