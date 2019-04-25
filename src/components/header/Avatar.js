import React from "react";
import avatar from "./avatar.png";

export default function Avatar() {
  return <img style={avatarStyle} src={avatar} alt="Avatar" />;
}

const avatarStyle = {
  height: "50px",
  width: "50px",
  border: "2px solid #449dd1",
  borderRadius: "50px",
  padding: "2px"
};
