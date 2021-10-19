import React, { useEffect } from "react";
import styled from "styled-components";
import {
  // IoCaretDownOutline,
  IoLogOutOutline,
  IoNotifications,
} from "react-icons/io5";
import Avatar from "../../components/Avatar";
import Dropdown from "../../components/Dropdown";
import DropdownMenu from "../../components/DropdownMenu";
import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux";

import { useState } from "react";
import Notifications from "../../components/Notifications";

function Accessibility({ userData, user = userData?.user, logOut }) {
  const socket = useSelector((state) => state.socket);

  const handleLogOut = (e) => {
    socket.emit("ACTIVE", { ...user, active: false });
    socket.emit("LOGOUT", user._id);
    logOut();
  };

  return (
    <AccessibilityContainer>
      {/* <Dropdown>
        <DropdownMenu />
      </Dropdown> */}
      <Notifications />
      <CircularContainer onClick={handleLogOut}>
        <IoLogOutOutline />
      </CircularContainer>
      <Link to={`/profile/${user._id}`}>
        <Avatar src={user.avatar} />
      </Link>
    </AccessibilityContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => {
      dispatch(logOut());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Accessibility);
const StyledLink = styled(Link)`
  text-decoration: none;
`;
const NoNotifications = styled.div`
  color: #a0b6c3;
  width: 100%;
  position: relative;
  top: -1px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55px;
  b {
    margin-right: 4px;
    color: #6f7a87;
  }
`;

const NotifyListItem = styled.div`
  min-width: 100%;
  padding: 14px;
  font-size: 13px;
  line-height: 18px;
  border-bottom: 1px solid #d5dfe4;
  height: 55px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  :hover {
    background: #ddecf3;
  }
  :last-child {
    border-bottom: 0px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  img {
    width: 35px;
    height: auto;
    border-radius: 30px;
  }
`;

const NotifyListItemImage = styled.div`
  margin-right: 12px;
`;

const NotifyListItemText = styled.div`
  color: #a0b6c3;
  width: 100%;
  position: relative;
  top: -1px;
  float: left;
  b {
    margin-right: 4px;
    color: #6f7a87;
  }
`;

const NotifyItems = styled.div`
  background: #e9eff2;
  width: 100%;
  max-height: 256px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  overflow-y: auto;
`;

const NotifyHeader = styled.div`
  background: #ffffff;
  width: 100%;
  height: 44px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: 1px solid #d5dfe4;
  font-size: 14px;
  line-height: 18px;
  div {
    width: 115px;
    margin: 0px auto;
    padding-top: 12px;
    color: gray;
    display: flex;
    justify-content: center;
  }
`;

const NotificationCount = styled.div`
  /* display: block; */
  position: absolute;
  top: -4px;
  width: 18px;
  font-size: 10px;
  height: 17px;
  padding-top: 0px;
  left: 20px;
  background: #18b5b5;
  color: #ffffff;
  -webkit-border-radius: 30px;
  -moz-border-radius: 30px;
  -ms-border-radius: 30px;
  -o-border-radius: 30px;
  border-radius: 30px;
  text-align: center;
  border: 1px solid #fff;
`;

const NotificationDropdown = styled.div`
  width: 360px;
  position: absolute;
  color: #2336ab;
  right: 100px;
  top: 48px;
  /* height: 500px; */
  -webkit-transform: translateY(18px);
  -moz-transform: translateY(18px);
  -o-transform: translateY(18px);
  transform: translateY(18px);
  /* -webkit-transition: -webkit-transform 0.4s, opacity 0.4s; */
  -moz-transition: -moz-transform 0.4s, opacity 0.4s;
  -ms-transition: -ms-transform 0.4s, opacity 0.4s;
  -o-transition: -o-transform 0.4s, opacity 0.4s;
  transition: transform 0.4s, opacity 0.4s;
`;

const AccessibilityContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CircularContainer = styled.span`
  height: 36px;
  width: 36px;
  background-color: #bbb;
  border-radius: 50%;
  display: flex;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
  transition: filter 300ms;
  position: relative;
  &:hover {
    filter: brightness(1.2);
  }
`;
