import { useEffect, useState } from "react";
import axios from "axios"
import { useParams, Link } from 'react-router-dom';
import { BsHeartFill, BsHeart } from "react-icons/bs";
// import { Button } from 'react-bootstrap';
import '../../styles/PostDetail.css'
import CommentList from "./CommentList";
import { getDownloadURL, getStorage , ref } from "firebase/storage";
import { useHistory } from 'react-router-dom';

function PostDetail() {
  const [postData, setPost] = useState()
  const [postImg, setPostImg] = useState()
  const postId = useParams().postId;

  const [isLike, setisLike] = useState(false)

  let history = useHistory();

  // api
  useEffect(async ()=>{
    try{
      const responseDetail = await axios.get(`http://i6c107.p.ssafy.io:8080/v1/post/${postId}`)
      const postDetail = responseDetail.data
      setPost(postDetail)

      // const storage = getStorage()
      // const storageRef = ref(storage, `gs://ssafy-01-user-image.appspot.com/${postDetail.data}`)
      // getDownloadURL(storageRef)
      // .then((url)=>{
      //   console.log(url)
      //   setPostImg(url)
      // })
    }catch{
      console.log("오류")
      // history.push("/pageNotFound")
    }
  }, [])
  

  return (
    <div className="PostDetail">
      {
        postData &&
        <section className="postdetail_section layout_padding_postdetail">
          <div className="container">

            {/* 목록으로 가기 버튼 */}
            <div className='backBtn'>
              <Link className='btnText' to='/post'><i className="fas fa-angle-double-left fa-lg"></i> 목록으로</Link>
            </div>

            <div className="row">

              {/* 이미지(수정필요) */}
              <div className="col-md-6 ">
                <div className="img-box">
                  <img src='\img\5.0_오리지날_라거_medium_-removebg-preview.png'></img> {/* postImg */}
                </div>
              </div>

              {/* 포스트 디테일 */}
              <div className="col-md-6">
                <div className="detail-box">

                  <div className="postdetail_heading">

                    <div className="postdetail_likecomment">
                      {/* 좋아요 하트 (수정필요) */}
                      <div className="heartInline">
                        {
                          isLike === true
                          ? <BsHeart className="heartIcon" size="23" onClick={()=>{setisLike(!isLike)}}></BsHeart>
                          : <BsHeartFill className="heartIcon" size="23" onClick={()=>{setisLike(!isLike)}}></BsHeartFill>
                        }
                        <div className="count">{ postData.likeMembers.length }</div>
                      </div>
                      {/* 댓글 */}
                      <div className="commentInline">
                        <i class="fas fa-comment fs-4"></i>
                        <div className="count">{postData.comments.length}</div>
                      </div>
                    </div>

                    {/* 맥주이름 버튼 */}
                    <Link to={`/beer/${postData.beer.beerId}`}>
                      <div className="beerName" href="">{postData.beer.name}</div>
                    </Link>
                    

                  </div>

                  {/* 해시태그 */}
                  <div className="postdetail_hashtag">
                    { postData.userHashTags.map((tag, i)=>{
                        return(<span className="postTag" key={i}>{tag.content}</span>)
                      }) }
                  </div>

                  {/* 포스트 내용 */}
                  <p>{ postData.content }</p>


                  {/* 작성날짜 */}
                  <div className="userdetail">
                    <div>작성자 : { postData.member.nickName } </div>
                    {/* <div>작성날짜 : { postData.created_at }</div> */}
                  </div>


                  {/* 본인 일때만 수정, 삭제 가능하게 해야함 */}
                  <div className="updateBtn">수정하기</div>
                  <div className="deleteBtn">삭제하기</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      }
      <CommentList postId={postId} />
    </div>
  )
  }
export default PostDetail;
