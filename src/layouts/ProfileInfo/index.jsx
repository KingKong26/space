import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useClickOutside } from "react-click-outside-hook";
import {
  IoBriefcaseOutline,
  IoHomeOutline,
  IoLocationOutline,
  IoSchoolOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Modal from "../Modal";

function ProfileInfo({ user }) {
  const [toggle, setToggle] = useState(false);
  const [modal, setModal] = useState();
  const [photos, setPhotos] = useState([]);
  
  useEffect(() => {
    let photos = [];
    user.userPosts?.forEach((post) => {
      post.medias?.forEach((media) => {
        if (media.split(".").pop(1) === "jpeg") {
          media = media.split("/").pop(1);
          photos = [...photos, media];
        }
      });
    });
    photos = photos.slice(0, 9);
    setPhotos(photos);
  }, [user]);

  // Modal
  const openModal = (src) => {
    setModal(src);
    setToggle(true);
  };

  const closeContainer = () => {
    setToggle(false);
  };

  const [parentRef, isClickedOutside] = useClickOutside();
  useEffect(() => {
    closeContainer();
  }, [isClickedOutside]);

  return (
    <>
      <Modal
        isOpen={toggle}
        setOpen={setToggle}
        closeContainer={closeContainer}
        parentRef={parentRef}
        isClickedOutside={isClickedOutside}
      >
        <img
          src={`http://localhost:5000/api/images/${modal}`}
          alt=""
          height="500px"
        />
      </Modal>
      <InfoCol>
        <ProfileIntro>
          <h3>About Me</h3>
          <IntroText>Welcome Stalker</IntroText>
          <hr />
          <ul>
            <li>
              <IoBriefcaseOutline style={introIconStyles} /> Javascript Dev
            </li>
            <li>
              <IoSchoolOutline style={introIconStyles} /> Went to Acharya,
              Bangalore
            </li>
            <li>
              <IoLocationOutline style={introIconStyles} />
              Lives in Bangalore
            </li>
            <li>
              <IoHomeOutline style={introIconStyles} />
              From Bangalore, india
            </li>
          </ul>
        </ProfileIntro>
        {photos && photos.length > 0 && (
          <ProfileIntro>
            <TitleBox>
              <h3>Photos</h3>
              <a href="#dummy">All Photos</a>
            </TitleBox>
            <PhotoBox>
              {photos &&
                photos.map((src) => {
                  return (
                    <div key={src} onClick={() => openModal(src)}>
                      <img
                        src={`http://localhost:5000/api/images/${src}`}
                        alt=""
                      />
                    </div>
                  );
                })}
            </PhotoBox>
          </ProfileIntro>
        )}
        <ProfileIntro>
          <TitleBox>
            <h3>Friends</h3>
            <a href="#dummy">All Friends</a>
          </TitleBox>
          {user.friends?.length > 0 ? (
            <p>{user.friends.length} friends</p>
          ) : (
            <p>No friends</p>
          )}
          <FriendsBox>
            {user.friends &&
              user.friends.map((friend) => {
                return (
                  <Link to={`/profile/${friend._id}`} key={friend._id} style={{textDecoration:"none", color:"black"}}>
                    <div>
                      <img src={friend.avatar} alt="" />
                      <p style={{fontSize:"12px"}}>{friend.fullName}</p>
                    </div>
                  </Link>
                );
              })}
          </FriendsBox>
        </ProfileIntro>
      </InfoCol>
    </>
  );
}

export default ProfileInfo;

const InfoCol = styled.div`
  flex-basis: 33%;
`;

const introIconStyles = { width: "26px", marginRight: "10px" };

const ProfileIntro = styled.div`
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 4px;
  h3 {
    font-weight: 600;
    margin: 0;
  }
  hr {
    border: 0;
    height: 1px;
    background: #ccc;
    margin: 24px 0;
  }
  ul li {
    list-style: none;
    font-size: 15px;
    margin: 15px 0;
    display: flex;
    align-items: center;
  }
  ul {
    padding: 0;
  }
`;

// const PostCol = styled.div`
//   flex-basis: 65%;
// `;

const IntroText = styled.p`
  text-align: center;
  margin: 10px 0;
  font-size: 15px;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    text-decoration: none;
    color: #1876f2;
    font-size: 14px;
  }
  h3 {
    margin: 0;
  }
`;

const PhotoBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: 10px;
  margin-top: 10px;
  h3 {
    margin: 0;
  }
  img {
    width: 100%;
    cursor: pointer;
    object-fit: cover;
    height: 90px;
    width: 90px;
    border-radius: 4px;
  }
  p {
    font-size: 14px;
  }
`;

const FriendsBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: 10px;
  margin-top: 15px;
  div img {
    width: 100%;
    cursor: pointer;
    object-fit: cover;
    border-radius: 4px;
    height: 90px;
    width: 90px;
    padding-bottom: 20px;
  }
  h3 {
    margin: 0;
  }
  div {
    position: relative;
  }
  p {
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 0;
  }
`;
