import"./post.css"
import{MoreVert,ThumbDown,ThumbUp,Comment,Save,Share} from "@material-ui/icons"
import { useState, useEffect } from "react";
import axios from "axios"
import {format} from "timeago.js"
import {Link} from "react-router-dom";

export default function Post({post}) {
    const [like,setLike] = useState(post.likes.length)
    const [isLiked,setIsLiked] = useState(false)
    const [user,setUser] = useState({})
    const likeHandler=()=>{
        setLike(isLiked? like-1:like+1)
        setIsLiked(!isLiked)
    }
    const [dislike,setDislike] = useState(post.dislike)
    const [isDisliked,setIsDisliked] = useState(false)
    const dislikeHandler=()=>{
        setDislike(isDisliked? dislike-1:dislike+1)
        setIsDisliked(!isDisliked)
    }
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`)
            setUser(res.data)
        };
        fetchUser();
    }, [post.userId]);

    return (
      <div className="post">
          <div className="postWrapper">
                <div className="postLeft">
                    <div className="postLeftTop">
                        <div className="postLeftTopLeft">
                            <Link to={`profile/${user.username}`}>
                                <img 
                                    className="postProfileImg" 
                                    src={user.profilePicture||PF+"profile/noAvatar.png"} 
                                    alt="" 
                                />
                            </Link>
                            <span className="postUsername">
                                {user.username}
                            </span>
                            <span className="postDate"> {format(post.createdAt)}</span>
                        </div>
                        <div className="postLeftTopRight">
                            <MoreVert/>
                        </div>
                    </div>
                    <div className="postLeftCenter">
                        <span className="postText">{post?.desc}</span>
                    </div>
                    <div className="postLeftBottom">
                        <div className="play">
                            <button className="playButton"> <img className="playImg" src="/assets/like.jpg"/></button>
                        </div>
                        <span className="songLink">https://thelink.com</span>
                    </div>
                </div>
                <div className="postRight">
                    <div className="postRightTop">
                        <img className="albumImg" src={PF+post.img} alt="" />
                    </div>
                    <div className="postRightBottom">
                        <div className="interactButton">
                            <ThumbUp style={{fontSize: 30}} onClick={likeHandler}/>
                            <span className="interactButtonText">Like</span>
                            <span className="postLikeCounter">{like}</span>
                        </div>
                        <div className="interactButton">
                            <ThumbDown style={{fontSize: 30}} onClick={dislikeHandler}/>
                            <span className="interactButtonText">Dislike</span>
                            <span className="postDislikeCounter">{dislike}</span>
                        </div>
                        <div className="interactButton">
                            <Comment style={{fontSize: 30}}/>
                            <span className="interactButtonText">Comment</span>
                            <span className="postCommentCounter">{post.comment}</span>
                        </div>
                        <div className="interactButton">
                            <Save style={{fontSize: 30}}/>
                            <span className="interactButtonText">Save</span>
                        </div>
                        <div className="interactButton">
                            <Share style={{fontSize: 30}}/>
                            <span className="interactButtonText">Share</span>
                        </div>
                    </div>
                </div>
          </div>
      </div>
    )
  }
