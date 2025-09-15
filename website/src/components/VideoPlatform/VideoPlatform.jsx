import React, { useState, useEffect, useRef } from "react";
import {
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import CommentIcon from "@mui/icons-material/Comment";
import { SettingsDialog } from "./components/SettingsDialog/SettingsDialog";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import LogoutIcon from "@mui/icons-material/Logout";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { Register } from "./components/Register/Register";
import { Menu, MenuItem } from "@mui/material";
import { useParams } from "react-router-dom";
import TaskCompletionModal from "../TaskCompletionModal/TaskCompletionModal";
import { getTasks } from "../../data/tasks";
import { getVideoInfo } from "../../data/videoInfo";
import { useLocation } from "react-router-dom";

const VideoPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userID = searchParams.get("userID") || 1;
  const tasks = getTasks(userID);
  const currentTask = tasks.find((task) => task.id === parseInt(id));

  const videoInfo = getVideoInfo(id);
  const videoRef = useRef(null);

  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [taskCompletionModalOpen, setTaskCompletionModalOpen] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [locationSharingEnabled, setLocationSharingEnabled] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // 注册表单状态
  const [newComment, setNewComment] = useState("");
  const [allComments, setAllComments] = useState(videoInfo.comments);

  // Set initial login state based on ID
  useEffect(() => {
    if (id === "13") {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
      setUsername("User");
    }
  }, [id]);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const handleLocationSharingChange = (enabled) => {
    setLocationSharingEnabled(enabled);
    if (id === "8" && !enabled) {
      setTaskCompletionModalOpen(true);
    }
  };

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUsername(userData.username);
    setLoginDialogOpen(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    handleMenuClose();
  };

  const handleSettingsClick = () => {
    setSettingsDialogOpen(true);
    handleMenuClose();
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  // Get thumbnail image based on video ID
  const getThumbnailImage = () => {
    switch (id) {
      case "8":
        return "/src/assets/building_1.jpeg";
      case "9":
        return "/src/assets/building_2.jpeg";
      case "10":
        return "/src/assets/building_3.jpeg";
      case "13":
        return "/src/assets/building_4.jpeg";
      default:
        return "/src/assets/building_1.jpeg";
    }
  };

  return (
    <div className="relative w-full h-screen bg-black flex justify-center items-center overflow-hidden">
      {id !== "13" && (
        <div className="absolute top-4 right-4 z-20">
          <div
            className={`flex items-center space-x-2 p-2 rounded-full border-2 cursor-pointer transition-colors border-white`}
            onClick={handleAvatarClick}
          >
            <AccountCircleIcon className="text-white" fontSize="medium" />
            <Typography
              variant="body2"
              className="text-white"
              fontWeight="bold"
            >
              Account
            </Typography>
          </div>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 4,
              sx: {
                mt: 1,
                minWidth: 160,
                borderRadius: 2,
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))",
                "& .MuiMenuItem-root": {
                  fontSize: "0.95rem",
                  paddingY: "10px",
                },
              },
            }}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleSettingsClick}>
              <SettingsIcon fontSize="small" sx={{ mr: 1 }} />
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </div>
      )}

      {/* Main container */}
      <div
        className="w-full max-w-screen-xl flex"
        style={{
          height: "calc(100vh - 4rem)",
        }}
      >
        {/* Video */}
        <div
          className={`relative rounded-2xl w-[500px] h-full bg-neutral-900 overflow-hidden transition-transform duration-300 ease-in-out ${
            showComments ? "ml-0 mr-auto" : "mx-auto"
          }`}
        >
          {/* Thumbnail image - shown while video is loading */}
          {!videoLoaded && (
            <div className="absolute inset-0 z-10">
              <img
                src={getThumbnailImage()}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-2xl mb-2">▶</div>
                  <div className="text-sm">Loading video...</div>
                </div>
              </div>
            </div>
          )}

          <video
            ref={videoRef}
            src={videoInfo.source}
            autoPlay
            loop={id !== "10"}
            muted
            playsInline
            onEnded={handleVideoEnd}
            onLoadedData={handleVideoLoad}
            className="w-full h-full object-cover"
            style={{ opacity: videoLoaded ? 1 : 0 }}
          />

          <div className="absolute bottom-20 left-4 right-4 text-white text-sm z-10">
            <div className="font-bold">@{videoInfo.channel}</div>
            <div>{videoInfo.description.split("\n")[0]}</div>
          </div>
          <div className="absolute bottom-10 left-4 right-4 px-2 text-sm text-gray-300 z-10">
            <div className="font-semibold">{videoInfo.title}</div>
            <div>
              {id === "8"
                ? "#calm #meditation #mindfulness #relaxation"
                : id === "9"
                ? "#night #city #urban #ambient"
                : id === "10"
                ? "#nature #wind #poetry #visual"
                : "#calm #meditation #mindfulness #relaxation"}
            </div>
          </div>

          <div className="absolute right-4 top-1/3 flex flex-col space-y-5 items-center text-white z-20">
            <div className="flex flex-col items-center">
              <button
                onClick={() => setLiked(!liked)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                  liked
                    ? "bg-white hover:bg-gray-200"
                    : "bg-[#2e2e2e] hover:bg-[#3a3a3a]"
                }`}
              >
                <ThumbUpAltRoundedIcon
                  style={{
                    color: liked ? "black" : "white",
                    fontSize: 24,
                  }}
                />
              </button>
              <span className="text-xs mt-1 text-white">
                {id === "8"
                  ? "847K"
                  : id === "9"
                  ? "1.2M"
                  : id === "10"
                  ? "2.1M"
                  : "1.3M"}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <button
                onClick={() => setShowComments(true)}
                className="w-12 h-12 rounded-full bg-[#2e2e2e] hover:bg-[#3a3a3a] flex items-center justify-center transition-all duration-200"
              >
                <CommentIcon style={{ color: "white", fontSize: 24 }} />
              </button>
              <span className="text-xs mt-1 text-white">
                {id === "8"
                  ? "8.2K"
                  : id === "9"
                  ? "12.5K"
                  : id === "10"
                  ? "15.7K"
                  : "10K"}
              </span>
            </div>
          </div>
        </div>
        {showComments && (
          <div className="w-[480px] h-full bg-black text-white z-30 flex flex-col border-l border-neutral-800">
            <div className="flex justify-between items-center p-6 pb-4 border-b border-neutral-800">
              <h2 className="text-lg font-bold">Comments</h2>
              <button
                className="w-10 h-10 text-2xl text-white rounded-full hover:bg-[#2a2a2a] flex items-center justify-center transition duration-200"
                onClick={() => setShowComments(false)}
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-6">
                {allComments.map((c) => (
                  <div key={c.id} className="flex space-x-3 items-start">
                    <Avatar sx={{ width: 32, height: 32, bgcolor: "#666" }}>
                      {c.user[0]}
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{c.user}</div>
                      <div className="text-sm text-gray-300 mb-1">{c.text}</div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{c.likes.toLocaleString()} likes</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Input Form - Fixed at bottom */}
            <div className="p-6 pt-4 border-t border-neutral-700 bg-black">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!isLoggedIn) {
                    setLoginDialogOpen(true);
                    return;
                  }
                  if (newComment.trim()) {
                    setAllComments([
                      ...allComments,
                      {
                        id: Date.now(),
                        user: username || "Guest",
                        text: newComment,
                        time: new Date().toLocaleDateString("en-US", {
                          month: "numeric",
                          day: "numeric",
                        }),
                        likes: 0,
                        replies: [],
                      },
                    ]);
                    setNewComment("");
                  }
                  setTaskCompletionModalOpen(true);
                }}
                className="flex items-center space-x-2"
              >
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onClick={() => {
                    if (!isLoggedIn && !loginDialogOpen)
                      setLoginDialogOpen(true);
                  }}
                  className="flex-1 bg-transparent border border-neutral-700 rounded-full px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none"
                  aria-label="Add a comment"
                />

                {
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium rounded-full border border-white text-white hover:bg-white hover:text-black transition-colors"
                    aria-label="Submit comment"
                  >
                    Submit
                  </button>
                }
              </form>
            </div>
          </div>
        )}
      </div>

      <Register
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        isId13={id === "13"}
      />
      <SettingsDialog
        open={settingsDialogOpen}
        onClose={() => setSettingsDialogOpen(false)}
        onLocationSharingChange={handleLocationSharingChange}
        initialLocationSharing={locationSharingEnabled}
      />

      <TaskCompletionModal
        id={id}
        open={taskCompletionModalOpen}
        targetTaskType={currentTask?.taskType}
        onClose={() => setTaskCompletionModalOpen(false)}
      />
    </div>
  );
};

export default VideoPage;
