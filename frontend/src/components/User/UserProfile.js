import "../../styles/UserProfile.css"
import { useEffect, useState } from "react";
import Followers from "components/Modals/Followers.js"
import Followings from "components/Modals/Followings.js"
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useStore } from "react-redux";
import { Button, ProgressBar } from "react-bootstrap";
import UserIcon from "./UserIcon";
const UserProfile = () => {
	const store = useStore((state)=>state)
	const dispatch = useDispatch();
	const userNum = useParams();
	const userid = userNum.userid
	
	
	const USER_UPDATE_PROFILE =  process.env.REACT_APP_SERVER + ':8080/v1/member/profile'
	const USER_POST = process.env.REACT_APP_SERVER + `:8000/v1/post/member/${userid}`
  const USER_PROFILE_URL = process.env.REACT_APP_SERVER + `:8080/v1/member/profile/${userid}`
	// 현재 member가 user를 팔로우하는 요청
	const FOLLOW_POST_URL = process.env.REACT_APP_SERVER + `:8080/v1/member/${store.getState().userReducer.memberId}/follow/${userid}`
	//member == 1번이 팔로우한 사람들
	const FOLLOW_GET_URL = process.env.REACT_APP_SERVER + `:8080/v1/member/${store.getState().userReducer.memberId}/followers`
	//member === 1번이 팔로잉하는 사람들
	const FOLLOWING_GET_URL = process.env.REACT_APP_SERVER + `:8080/v1/member/${store.getState().userReducer.memberId}/followings`




	
	//숫자에 memberId 값 추가 할것
	

	// user 데이터 불러오기
 	const [user, setUser] = useState('')	// 유저 데이터
	// const [usercolor, setUsercolor] = useState("")		// 사진 색깔
	const [followButton, setFollowButton] = useState(null)
	
	const headers = store.getState().headerReducer
	const setFollow = async () =>{
		setFollowButton(!followButton)
		await axios.post(FOLLOW_POST_URL)		
	}
	





	useEffect(()=>{
		const fetchData = async () =>{
			const res = await axios.get(FOLLOWING_GET_URL)
			dispatch({type:'followings', followings:res.data.data})
		}
		fetchData();
	}, [])





	// useEffect(()=>{
	// 	const fetchData = async () =>{
	// 		const res = await axios.get(USER_POST)
	// 		console.log(res.data)
	// 	}
	// 	fetchData()
	// }, [])


	useEffect(()=>{
		const fetchData = async () =>{
			const followers = []
			const res = await axios.get(FOLLOW_GET_URL)
			if (res.data.data.length === 0) {
				dispatch({type:'followers', followers:followers})
				setFollowButton(false)
				return 
			}
			for (let i = 0; i < res.data.data.length; i++){
				followers.push(res.data.data[i])
				if (res.data.data[i].memberId === 2){
					setFollowButton(true)
				}else {
					setFollowButton(false)
				}
			}
			dispatch({type:'followers', followers:followers})

		}
		fetchData();
	}, [])
	


	useEffect(() =>{
		
		const fetchData = async () => {
			const profiledata = await axios.get(`${USER_PROFILE_URL}`)
			setUser(profiledata)
			// setUsercolor(profiledata.profileColor)	
		}
		if (store.getState().userProfileReducer.length === 0){
			fetchData();
		} else {
			setUser(store.getState().userProfileReducer)
			// setUsercolor(store.getState().userReducer.data.profileColor)
		}
		
	},[])


  const [followersModalOpen, setFollowersModalOpen] = useState(false);
  const [followingsModalOpen, setFollowingsModalOpen] = useState(false);
  const followersOpenModal = () => {
    setFollowersModalOpen(true);
  };
  const followersCloseModal = () => {
    setFollowersModalOpen(false);
  };
  const followingsOpenModal = () => {
    setFollowingsModalOpen(true);
  };
  const followingsCloseModal = () => {
    setFollowingsModalOpen(false);
  };

	// const iconClick = () =>{
	// 	if (usercolor && usercolor === 'White') {
	// 		setUsercolor('blue')
	// 	} else if (usercolor && usercolor === 'blue'){
	// 		setUsercolor('yellow')
	// 	} else if (usercolor && usercolor === 'yellow'){
	// 		setUsercolor('green')
	// 	} else if (usercolor && usercolor === 'green'){
	// 		setUsercolor('White')
	// 	}
	// 	const userData = store.getState().userReducer
	// 	userData['profileColor'] = usercolor;
	// 	axios.put(USER_UPDATE_PROFILE, userData, {headers})
  //     .then((res)=>{
  //       // history.push(`/profile/${1}/profile`)
	// 			console.log(res)
  //       // window.location.replace(`/profile/${1}/profile`)
  //     })
  //   } 
	

  return (
		<div className="userprofile_container">
			{user && 
				<div className="user-profile ">
					<div className="img-box">
						{/* user.profileColor 색깔로 배경 지정 (기본흰색) */}
						<div className="profile-image-box">
							<UserIcon className="usericon" role={'button'} grade={user.grade} />	
							{/* <IoIosBeer className="usericon" role={'button'} onClick={iconClick}></IoIosBeer> */}
							
						</div>
					</div>
					<div id="profile-box">
						<div id="nickname">
							<h1>{user.nickName}</h1>
							<Link to={`/profile/${user.memberId}/edit`}>
							<button className="editBtn">수정</button>
							</Link>
						</div>
						<Button variant={!followButton ? "primary":"secondary"}  onClick={setFollow}>{!followButton ? '팔로우':'언팔로우'}</Button>
						<div>
							{/* <div className="postnum">게시글 : {14} </div> */}
							<br></br>
							<div className="follow_all">
								<div className="follower">
									<button className="followBtn" onClick={followersOpenModal} variant="success">팔로워</button>
									 : {user.followers.length} 
								</div>
								<div className="following">
									<button className="followBtn" onClick={followingsOpenModal} variant="warning"> 팔로잉</button>
									 : {user.followings.length}
								</div>
							</div>
							<Followers open={followersModalOpen} close={followersCloseModal} header="팔로워">
								followers
							</Followers>
							<Followings open={followingsModalOpen} close={followingsCloseModal} header="팔로잉">
								followings
							</Followings>
							
							<p className="user_intro">한줄 소개 : {user.intro ? user.intro : '없네용' }</p>
							
							<ProgressBar now={user.grade/5} label={`${user.grade/5}%`} />
						</div>
					</div>
				</div>
			}
		</div>
  )
}


export default UserProfile;
