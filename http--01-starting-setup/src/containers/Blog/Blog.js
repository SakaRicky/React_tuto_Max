import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../axios';

import './Blog.css';

class Blog extends Component {

    state = {
        posts: [], 
        selectedPostId: null,
        error: false
    }

    componentDidMount () {
        axios.get('/posts')
             .then(response => {
                 const posts = response.data.slice(0, 4);
                 const updatedPosts = posts.map(post => {
                     return {
                         ...post, 
                         author:"Ricky"
                        }
                 })
                 this.setState({posts: updatedPosts});
             })
             .catch(error => {
                //  console.log(error);
                this.setState({error: true})
             })
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }     

    render () {

        let allPosts= <p style={{textAlign: 'center'}}>Something went wrong</p>
        if (this.state.error === false) {
            allPosts = this.state.posts.map(post => {
                return <Post 
                            key={post.id} 
                            post={post} 
                            clicked={() => this.postSelectedHandler(post.id)}/>
            });
        }
        
        return (
            <div className='Blog'>
                <header>
                    <nav>
                        <ul>
                            <li><a href='/'>Home</a></li>
                            <li><a href='/new-post'>New Post</a></li>
                        </ul>
                    </nav>
                </header>
                <section className='Posts'>
                   {allPosts} 
                </section>
            </div>
        );
    }
}

export default Blog;