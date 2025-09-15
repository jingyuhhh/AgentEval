import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { getTasks } from "../../data/tasks";
import { usePreserveQueryNavigate } from "../../hooks/useQueryNavigate";
import Survey from "./components/Survey/Survey";
import { db } from "../../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { likertQuestions } from "./components/Survey/Survey";
import { resetCart } from "../../store/cart";
import { useDispatch } from "react-redux";
import { usePopup } from "../../Provider/usePopup";
import { sanitizeForFirestore } from "../../logger";

const TaskCompletionModal = ({
  id,
  open,
  targetTaskType,
  onClose,
  formData,
}) => {
  const navigate = usePreserveQueryNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { notifyTaskCompletionModalOpen } = usePopup();
  const searchParams = new URLSearchParams(location.search);
  const isAgent = searchParams.get("agent") === "true";
  const userID = searchParams.get("userID") || 1;
  const tasks = getTasks(userID);
  const currentTaskIndex = tasks.findIndex((task) => task.id === parseInt(id));

  const [likertAnswers, setLikertAnswers] = useState(Array(5).fill(null));
  const [yesNoMaybe, setYesNoMaybe] = useState(null);

  // Snackbar 状态
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const isEnd = currentTaskIndex === 15;

  // 通知PopupProvider TaskCompletionModal的打开状态
  useEffect(() => {
    if (notifyTaskCompletionModalOpen) {
      notifyTaskCompletionModalOpen(open);
    }

    // 组件卸载时通知关闭状态
    return () => {
      if (notifyTaskCompletionModalOpen) {
        notifyTaskCompletionModalOpen(false);
      }
    };
  }, [open]);

  const handleNextTask = async () => {
    if (likertAnswers.some((a) => a === null) || yesNoMaybe === null) {
      setSnackbarOpen(true);
      return;
    }

    const userActions = window.userActions || [];

    const userIDInt = parseInt(userID);
    const likertData = likertQuestions.reduce((acc, q, idx) => {
      acc[q.key] = likertAnswers[idx];
      return acc;
    }, {});
    const timestamp = Date.now();

    const lastInputValues = window.lastInputValues || {};
    const lastToggleStates = window.lastToggleStates || {};
    const visitedRoutes = window.visitedRoutes || [];
    const docId = `${userIDInt}_${tasks[currentTaskIndex].id}_${timestamp}`;

    const surveyData = {
      userID: userIDInt,
      taskID: tasks[currentTaskIndex].id,
      ...likertData,
      awareness: yesNoMaybe,
      createdAt: serverTimestamp(),
      userActions: userActions,
      lastInputValues: lastInputValues,
      lastToggleStates: lastToggleStates,
      visitedRoutes: visitedRoutes,
      uploadedAt: new Date().toISOString(),
      userAgent: navigator.userAgent,
      ...(formData &&
        formData.skipReason && {
          skipped: true,
          skipReason: formData.skipReason,
        }),
    };
    console.log(surveyData);
    const sanitizedPayload = sanitizeForFirestore(surveyData);
    try {
      await setDoc(doc(db, "surveyResponses", docId), sanitizedPayload);
      console.log("Survey and logs submitted to Firebase:", docId);
    } catch (err) {
      console.error("Error saving survey:", err);
    }

    if (onClose) onClose();

    localStorage.removeItem("userActions");
    localStorage.removeItem("lastInputValues");
    localStorage.removeItem("lastToggleStates");
    localStorage.removeItem("visitedRoutes");
    dispatch(resetCart());

    if (isEnd) {
      navigate("/task/0");
    } else {
      navigate(`/task/${nextTask.id}`);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const nextTask = tasks[(currentTaskIndex + 1) % 16];

  // Agent 模式
  if (isAgent) {
    return (
      <Dialog open={open}>
        <DialogTitle>Task Completion Successful</DialogTitle>
        <DialogContent>
          <Typography>You finished the task successfully!</Typography>
        </DialogContent>
      </Dialog>
    );
  }

  const isSkippedTask = formData && formData.skipReason;

  if (tasks[currentTaskIndex].taskType === targetTaskType || isSkippedTask) {
    return (
      <>
        <Dialog
          open={open}
          fullWidth
          maxWidth="lg"
          disableEscapeKeyDown
          onClose={() => {}}
          sx={{
            zIndex: 9999,
            "& .MuiDialog-paper": {
              zIndex: 9999,
            },
          }}
        >
          <DialogTitle>
            {isSkippedTask ? "Task Skipped" : "Task Completion Successful"}
          </DialogTitle>
          <DialogContent>
            {isSkippedTask && (
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                You skipped this task. Reason: {formData.skipReason}
              </Typography>
            )}
            <Typography>
              Please rate your opinions on these statements
            </Typography>
            <br />
            <Survey
              likertAnswers={likertAnswers}
              setLikertAnswers={setLikertAnswers}
              yesNoMaybe={yesNoMaybe}
              setYesNoMaybe={setYesNoMaybe}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNextTask} color="primary">
              Next Task
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="warning" onClose={handleSnackbarClose}>
            Please answer all questions before continuing.
          </Alert>
        </Snackbar>
      </>
    );
  } else return <></>;
};

export default TaskCompletionModal;
