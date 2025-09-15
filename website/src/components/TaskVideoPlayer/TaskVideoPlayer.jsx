import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getTasks } from "../../data/tasks";
import { Button, Box, Typography, Container } from "@mui/material";
import TaskCompletionModal from "../TaskCompletionModal/TaskCompletionModal";
import { usePreserveQueryNavigate } from "../../hooks/useQueryNavigate";

const TaskVideoPlayer = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = usePreserveQueryNavigate();

  const searchParams = new URLSearchParams(location.search);
  const userID = searchParams.get("userID") || 1;
  const tasks = getTasks(userID);
  const currentTask = tasks.find((task) => task.id === parseInt(id));

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCompleteButton, setShowCompleteButton] = useState(false);
  const [taskCompletionModalOpen, setTaskCompletionModalOpen] = useState(false);
  const [videoSource, setVideoSource] = useState("");

  const loadVideo = async (taskId) => {
    try {
      const videoModule = await import(`../../assets/task${taskId}.mov`);
      setVideoSource(videoModule.default);
    } catch (error) {
      console.error(`Error loading video for task ${taskId}:`, error);
      setVideoSource("");
    }
  };

  React.useEffect(() => {
    if (id) {
      loadVideo(id);
    }
  }, [id]);

  const handleVideoEnd = () => {
    setShowCompleteButton(true);
  };

  const handleCompleteSurvey = () => {
    setTaskCompletionModalOpen(true);
  };

  const handleTaskCompletionClose = () => {
    setTaskCompletionModalOpen(false);
    // 跳转到下一个任务或结束页面
    const currentTaskIndex = tasks.findIndex(
      (task) => task.id === parseInt(id)
    );
    if (currentTaskIndex === 15) {
      navigate("/task/0");
    } else {
      const nextTask = tasks[(currentTaskIndex + 1) % 16];
      navigate(`/task/${nextTask.id}`);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom></Typography>
        <Typography variant="body1" color="text.secondary"></Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 3,
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "100%",
            position: "relative",
          }}
        >
          {!videoSource ? (
            <Box
              sx={{
                width: "100%",
                height: "400px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "grey.100",
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Loading video...
              </Typography>
            </Box>
          ) : (
            <video
              ref={videoRef}
              src={videoSource}
              controls
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "70vh",
              }}
              onEnded={handleVideoEnd}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          )}

          {videoSource && (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: isPlaying ? 0 : 0.8,
                transition: "opacity 0.3s",
                pointerEvents: "none",
              }}
            >
              <Typography variant="h1" color="white">
                {isPlaying ? "⏸️" : "▶️"}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Button
          variant="contained"
          color="success"
          size="large"
          disabled={!showCompleteButton}
          onClick={handleCompleteSurvey}
        >
          Complete Survey
        </Button>
      </Box>

      <TaskCompletionModal
        id={id}
        open={taskCompletionModalOpen}
        targetTaskType={currentTask?.taskType}
        onClose={handleTaskCompletionClose}
      />
    </Container>
  );
};

export default TaskVideoPlayer;
