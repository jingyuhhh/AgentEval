import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { getTasks, DomainType } from "../../data/tasks.js";
import {
  PII,
  ecommercePII,
  socialMediaPII,
  videoStreamPII,
} from "../../data/PII.js";
import TaskCompletionModal from "../TaskCompletionModal/TaskCompletionModal.jsx";

const TaskInfoBanner = () => {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userID = searchParams.get("userID") || 1;
  const tasks = getTasks(userID);
  const [completionModalOpen, setCompletionModalOpen] = useState(false);
  const bannerRef = useRef(null);
  const [bannerHeight, setBannerHeight] = useState(0);

  const getCurrentTask = () => {
    if (id) {
      return tasks.find((task) => task.id === parseInt(id));
    }
    return tasks[0];
  };

  const currentTask = getCurrentTask();

  const getCurrentTaskNumber = () => {
    if (id) {
      const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
      return taskIndex !== -1 ? taskIndex + 1 : 1;
    }
    return 1;
  };

  const currentTaskNumber = getCurrentTaskNumber();

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

  const currentPII = getPIIByDomain(currentTask?.domain);

  useEffect(() => {
    const measure = () => {
      if (bannerRef.current) {
        setBannerHeight(bannerRef.current.offsetHeight || 0);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [id, currentTask]);

  if (!currentTask) return null;

  return (
    <>
      <Box
        ref={bannerRef}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1400,
          bgcolor: "grey.100",
          borderBottom: "1px solid",
          borderColor: "grey.300",
          px: 2,
          py: 1.5,
          boxShadow: 1,
          userSelect: "text",
          WebkitUserSelect: "text",
          MozUserSelect: "text",
        }}
      >
        <Typography
          variant="h6"
          color="primary"
          sx={{ fontWeight: 700, fontSize: 18 }}
        >
          Task {currentTaskNumber}/16
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 16 }}>
          <strong>Task :</strong> {currentTask.title}
        </Typography>

        <Typography
          variant="h6"
          color="primary"
          sx={{ fontWeight: 700, fontSize: 18 }}
        >
          Personal Information
        </Typography>
        <div sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 0.5 }}>
          {currentTask?.domain === DomainType.ECommerce && (
            <>
              <Typography
                component="span"
                variant="body1"
                sx={{ fontSize: 16 }}
              >
                <strong>Full Name:</strong> {currentPII.fullname}{" "}
              </Typography>
              <Typography
                component="span"
                variant="body1"
                sx={{ fontSize: 16 }}
              >
                <strong>Phone:</strong> {currentPII.phone}
              </Typography>
              <Typography
                component="span"
                variant="body1"
                sx={{ fontSize: 16 }}
              >
                <strong>Address:</strong> {currentPII.address}
              </Typography>
              <Typography
                component="span"
                variant="body1"
                sx={{ fontSize: 16 }}
              >
                <strong>Payment Password:</strong> {currentPII.password}
              </Typography>
            </>
          )}
          {currentTask?.domain === DomainType.SocialMedia && (
            <>
              <Typography
                component="span"
                variant="body1"
                sx={{ fontSize: 16 }}
              >
                <strong>Full Name:</strong> {currentPII.fullname}
              </Typography>
              <Typography
                component="span"
                variant="body1"
                sx={{ fontSize: 16 }}
              >
                <strong>Email:</strong> {currentPII.email}
              </Typography>
              <Typography
                component="span"
                variant="body1"
                sx={{ fontSize: 16 }}
              >
                <strong>Birthday:</strong> {currentPII.birthday}
              </Typography>
            </>
          )}
          {currentTask?.domain === DomainType.VideoStream && (
            <>
              <Typography
                component="span"
                variant="body1"
                sx={{ fontSize: 16 }}
              >
                <strong>Full Name:</strong> {currentPII.fullname}
              </Typography>
              <Typography
                component="span"
                variant="body1"
                sx={{ fontSize: 16 }}
              >
                <strong>Username:</strong> {currentPII.username}
              </Typography>
              <Typography
                component="span"
                variant="body1"
                sx={{ fontSize: 16 }}
              >
                <strong>Email:</strong> {currentPII.email}
              </Typography>
              <Typography
                component="span"
                variant="body1"
                sx={{ fontSize: 16 }}
              >
                <strong>Password:</strong> {currentPII.password}
              </Typography>
            </>
          )}
        </div>

        <Box sx={{ mt: 1 }}>
          <Button
            variant="outlined"
            color="warning"
            size="small"
            onClick={() => setCompletionModalOpen(true)}
          >
            Skip Task
          </Button>
        </Box>

        <TaskCompletionModal
          id={id}
          open={completionModalOpen}
          targetTaskType={currentTask?.taskType}
          onClose={() => setCompletionModalOpen(false)}
          formData={{ skipReason: null }}
        />
      </Box>
      <Box sx={{ height: bannerHeight }} />
    </>
  );
};

export default TaskInfoBanner;
