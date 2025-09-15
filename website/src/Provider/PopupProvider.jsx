import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GlobalPopup from "./GlobalPopup";
import { PopupContext } from "./PopupContext";

export const PopupProvider = ({ children, interval }) => {
  const [open, setOpen] = useState(false);
  const [popupDisabled, setPopupDisabled] = useState(false);
  const [hasShownInitial, setHasShownInitial] = useState(false);
  const [isTaskCompletionModalOpen, setIsTaskCompletionModalOpen] =
    useState(false);
  const location = useLocation();

  const match = location.pathname.match(/\/task\/(\d+)\/(.+)/);
  const taskId = match ? parseInt(match[1], 10) : null;
  const extraPath = match ? match[2] : null;

  const isInTaskCompletionModal =
    location.pathname.includes("/task/") &&
    (location.pathname.includes("/completion") ||
      location.pathname.includes("/survey") ||
      location.pathname.includes("/end") ||
      location.pathname.includes("/taskvideo"));

  useEffect(() => {
    if (taskId !== 10) {
      setPopupDisabled(false);
      setHasShownInitial(false);
    }
  }, [taskId]);

  useEffect(() => {
    if (!hasShownInitial && taskId === 10 && extraPath && !popupDisabled) {
      setOpen(true);
      setHasShownInitial(true);
    }
  }, [taskId, extraPath, hasShownInitial, popupDisabled]);

  useEffect(() => {
    let timer;
    if (taskId === 10 && isInTaskCompletionModal) {
      setOpen(false);
      setPopupDisabled(true);
      return;
    }

    if (isTaskCompletionModalOpen) {
      setOpen(false);
      return;
    }

    if (!popupDisabled && hasShownInitial && taskId === 10 && extraPath) {
      timer = setInterval(() => {
        setOpen(true);
      }, interval);
    }

    return () => clearInterval(timer);
  }, [
    taskId,
    extraPath,
    interval,
    popupDisabled,
    hasShownInitial,
    isInTaskCompletionModal,
    isTaskCompletionModalOpen,
  ]);

  const handleClose = () => setOpen(false);

  const handleDisablePopup = () => {
    setPopupDisabled(true);
    setOpen(false);
  };

  const notifyTaskCompletionModalOpen = (isOpen) => {
    setIsTaskCompletionModalOpen(isOpen);
  };

  return (
    <PopupContext.Provider
      value={{
        open,
        setOpen,
        handleDisablePopup,
        notifyTaskCompletionModalOpen,
      }}
    >
      {children}
      <GlobalPopup
        open={open}
        onClose={handleClose}
        onDisable={handleDisablePopup}
      />
    </PopupContext.Provider>
  );
};
