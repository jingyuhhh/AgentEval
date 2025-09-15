import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getTasks,
  TaskType,
  DomainType,
  shouldPlayVideo,
} from "../../data/tasks";
import {
  PII,
  ecommercePII,
  socialMediaPII,
  videoStreamPII,
} from "../../data/PII";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { IconButton } from "@mui/material";
import { usePreserveQueryNavigate } from "../../hooks/useQueryNavigate";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const resetLoggerData = () => {
  localStorage.removeItem("userActions");
  localStorage.removeItem("lastInputValues");
  localStorage.removeItem("lastToggleStates");
  localStorage.removeItem("visitedRoutes");

  window.userActions = [];
  window.lastInputValues = {};
  window.lastToggleStates = {};
  window.visitedRoutes = [];
};

const TaskEntry = () => {
  const { id } = useParams();
  const navigate = usePreserveQueryNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const userID = searchParams.get("userID") || 1;
  const tasks = getTasks(userID);

  const parsedId = parseInt(id, 10);
  const task = tasks.find((task) => task.id === parsedId);

  const getPIIByDomain = (domain) => {
    switch (domain) {
      case DomainType.ECommerce:
        return ecommercePII;
      case DomainType.SocialMedia:
        return socialMediaPII;
      case DomainType.VideoStream:
        return videoStreamPII;
      default:
        return PII;
    }
  };

  const currentPII = getPIIByDomain(task?.domain);

  useEffect(() => {
    resetLoggerData();
  }, [id]);

  const handleContinue = () => {
    const taskIndex = tasks.findIndex((t) => t.id === task.id);

    if (shouldPlayVideo(userID, taskIndex)) {
      navigate(`/task/${id}/taskvideo`);
    } else {
      if (task.domain === DomainType.VideoStream) {
        navigate(`/task/${id}/video`);
      } else if (
        task.taskType === TaskType.CancelSubscription ||
        task.taskType === TaskType.SignSubscription
      ) {
        navigate(`/task/${id}/store`);
      } else {
        navigate(`/task/${id}/shopping`);
      }
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            Task Information
          </Typography>
          {shouldPlayVideo(
            userID,
            tasks.findIndex((t) => t.id === task.id)
          ) && (
            <Box
              sx={{
                mb: 3,
                p: 2,
                bgcolor: "yellow.50",
                borderRadius: 1,
                border: "1px solid #f0ad4e",
              }}
            >
              <Typography variant="body1" color="text.primary">
                This task involves watching a GUI agent perform the task. If you
                disagree with the agent’s choice, you may skip the task.
              </Typography>
            </Box>
          )}
          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            You can check the information later during task by clicking
            <HelpOutlineIcon
              sx={{
                fontSize: 20,
                verticalAlign: "middle",
              }}
            />
            on top left corner
          </Typography>

          <Box sx={{ mt: 3 }}>
            <Box sx={{ mb: 3, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
              <Typography variant="h6" gutterBottom color="primary">
                Task: {task.title}
              </Typography>
            </Box>

            {/* Display PII data based on domain */}
            <Box sx={{ mb: 3, p: 2, bgcolor: "grey.100", borderRadius: 1 }}>
              <Typography variant="h6" gutterBottom color="secondary">
                Personal Information ({task.domain}):
              </Typography>
              {task.domain === DomainType.ECommerce && (
                <>
                  <Typography>Full Name: {currentPII.fullname}</Typography>
                  <Typography>Phone: {currentPII.phone}</Typography>
                  <Typography>Address: {currentPII.address}</Typography>
                  <Typography>
                    Payment Password: {currentPII.password}
                  </Typography>
                </>
              )}
              {task.domain === DomainType.SocialMedia && (
                <>
                  <Typography>Full Name: {currentPII.fullname}</Typography>
                  <Typography>Email: {currentPII.email}</Typography>
                  <Typography>Birthday: {currentPII.birthday}</Typography>
                </>
              )}
              {task.domain === DomainType.VideoStream && (
                <>
                  <Typography>Full Name: {currentPII.fullname}</Typography>
                  <Typography>Username: {currentPII.username}</Typography>
                  <Typography>Email: {currentPII.email}</Typography>
                  <Typography>Password: {currentPII.password}</Typography>
                </>
              )}
            </Box>

            <Button
              variant="contained"
              size="large"
              onClick={handleContinue}
              sx={{ mt: 2 }}
            >
              Continue
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default TaskEntry;
