import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Typography,
  Divider,
  IconButton,
  Switch,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Avatar,
  Chip,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItem,
  ListItemIcon,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SecurityIcon from "@mui/icons-material/Security";
import ReportIcon from "@mui/icons-material/Report";
import BlockIcon from "@mui/icons-material/Block";
import WarningIcon from "@mui/icons-material/Warning";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useParams } from "react-router-dom";
import TaskCompletionModal from "../../../TaskCompletionModal/TaskCompletionModal";
import { getTasks } from "../../../../data/tasks";
import { useLocation } from "react-router-dom";

const initialmenuItems = [
  "Account",
  "Data Protection",
  "Safety",
  "Content",
  "Privacy",
  // "Your Preferences",
];

const filteredMenuItems = [
  "Account",
  // "Data Protection",
  "Safety",
  // "Content",
  // "Privacy",
  // "Your Preferences",
];

export const SettingsDialog = ({
  open,
  onClose,
  onLocationSharingChange,
  initialLocationSharing = true,
}) => {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userID = searchParams.get("userID") || 1;
  const tasks = getTasks(userID);
  const currentTask = tasks.find((task) => task.id === parseInt(id));

  const menuItems = id === "10" ? filteredMenuItems : initialmenuItems;
  const [selected, setSelected] = useState(menuItems[0]);
  const [email, setEmail] = useState("john.doe@example.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [fullName, setFullName] = useState("John Doe");
  const [username, setUsername] = useState("johndoe123");
  const [userLocation, setUserLocation] = useState(
    "1234 Elm Street, Springfield, IL 62704, USA"
  );
  const [birthDate, setBirthDate] = useState("1990-05-15");
  const [twoFactor, setTwoFactor] = useState(true);
  const [allowTracking, setAllowTracking] = useState(false);
  const [reportAbuse, setReportAbuse] = useState(false);
  const [adPersonalization, setAdPersonalization] = useState(true);
  const [locationSharing, setLocationSharing] = useState(
    initialLocationSharing
  );
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [thirdPartySharing, setThirdPartySharing] = useState(false);
  const [taskCompletionModalOpen, setTaskCompletionModalOpen] = useState(false);

  const renderContent = () => {
    switch (selected) {
      case "Account":
        return (
          <>
            <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
              Manage your account information, security settings, and profile
              details.
            </Typography>

            {/* Profile Section */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Profile Information
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar sx={{ width: 64, height: 64, mr: 2 }}>
                  {fullName.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6">{fullName}</Typography>
                  <Chip
                    label="Verified Account"
                    color="success"
                    size="small"
                    icon={<VerifiedIcon />}
                  />
                </Box>
              </Box>

              <Box
                sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
              >
                <TextField
                  fullWidth
                  label="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Location"
                  value={userLocation}
                  onChange={(e) => setUserLocation(e.target.value)}
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Birth Date"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            </Box>

            {/* Security Section */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Security Settings
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={twoFactor}
                    onChange={(e) => setTwoFactor(e.target.checked)}
                  />
                }
                label="Two-Factor Authentication"
              />
              <Typography
                variant="caption"
                display="block"
                sx={{ ml: 4, color: "text.secondary" }}
              >
                Add an extra layer of security to your account using SMS or
                authenticator app.
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                  />
                }
                label="Email Notifications for Security Events"
              />
              <Typography
                variant="caption"
                display="block"
                sx={{ ml: 4, color: "text.secondary" }}
              >
                Receive alerts for login attempts, password changes, and
                suspicious activity.
              </Typography>
            </Box>

            {/* Account Status */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Account Status
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Chip label="Active" color="success" />
                <Chip label="Email Verified" color="primary" />
                <Chip label="Phone Verified" color="primary" />
              </Box>
            </Box>
          </>
        );

      case "Data Protection":
        return (
          <>
            <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
              Control how your personal data is collected, processed, and
              protected in compliance with GDPR and other privacy regulations.
            </Typography>

            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body2">
                We are committed to protecting your privacy and ensuring
                compliance with the General Data Protection Regulation (GDPR)
                and other applicable privacy laws.
              </Typography>
            </Alert>

            {/* Data Collection */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Data Collection & Processing
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={allowTracking}
                    onChange={(e) => setAllowTracking(e.target.checked)}
                  />
                }
                label="Allow Usage Analytics"
              />
              <Typography
                variant="caption"
                display="block"
                sx={{ ml: 4, color: "text.secondary", mb: 2 }}
              >
                Help us improve our services by sharing anonymous usage data.
                This data is aggregated and cannot identify you personally.
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={thirdPartySharing}
                    onChange={(e) => setThirdPartySharing(e.target.checked)}
                  />
                }
                label="Allow Third-Party Data Sharing"
              />
              <Typography
                variant="caption"
                display="block"
                sx={{ ml: 4, color: "text.secondary", mb: 2 }}
              >
                Share data with trusted partners for service improvement and
                personalized experiences.
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={marketingEmails}
                    onChange={(e) => setMarketingEmails(e.target.checked)}
                  />
                }
                label="Marketing Communications"
              />
              <Typography
                variant="caption"
                display="block"
                sx={{ ml: 4, color: "text.secondary" }}
              >
                Receive promotional emails and updates about new features and
                services.
              </Typography>
            </Box>

            {/* Data Retention */}

            {/* GDPR Rights */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Your GDPR Rights
              </Typography>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">Right to Access</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">
                    You have the right to request a copy of all personal data we
                    hold about you. This includes data we collect, process, and
                    share with third parties.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">
                    Right to Rectification
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">
                    You can request correction of inaccurate personal data and
                    completion of incomplete data.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">Right to Erasure</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">
                    You can request deletion of your personal data in certain
                    circumstances, such as when the data is no longer necessary
                    for the purposes for which it was collected.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">
                    Right to Data Portability
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">
                    You can request a copy of your personal data in a
                    structured, machine-readable format for transfer to another
                    service provider.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </>
        );

      case "Safety":
        return (
          <>
            <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
              Help maintain a safe and respectful community by understanding our
              safety policies and reporting mechanisms.
            </Typography>

            <Alert severity="warning" sx={{ mb: 3 }}>
              <Typography variant="body2">
                We take safety seriously. Any violation of our community
                guidelines may result in content removal, temporary suspension,
                or permanent account termination.
              </Typography>
            </Alert>

            {/* Reporting System */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Reporting System
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={reportAbuse}
                    onChange={(e) => {
                      setReportAbuse(e.target.checked);
                      // 如果id是10且启用了Auto-Reporting，弹出TaskCompletionModal
                      if (id === "10" && e.target.checked) {
                        setTaskCompletionModalOpen(true);
                      }
                    }}
                  />
                }
                label="Enable Auto-Reporting"
              />
              <Typography
                variant="caption"
                display="block"
                sx={{ ml: 4, color: "text.secondary", mb: 2 }}
              >
                Automatically flag content that violates community guidelines
                using AI detection.
              </Typography>

              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                Report Categories:
              </Typography>

              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <ReportIcon color="error" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Harassment & Bullying"
                    secondary="Targeted abuse, threats, or intimidation"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <WarningIcon color="warning" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Fraud & Scams"
                    secondary="Deceptive practices, fake accounts, or financial scams"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BlockIcon color="error" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Impersonation"
                    secondary="Fake accounts pretending to be someone else"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SecurityIcon color="warning" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Hate Speech"
                    secondary="Content promoting violence or discrimination"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <WarningIcon color="warning" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Inappropriate Content"
                    secondary="Explicit, violent, or age-inappropriate material"
                  />
                </ListItem>
              </List>
            </Box>

            {/* Enforcement Policy */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Enforcement & Penalties
              </Typography>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">Warning System</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" paragraph>
                    First-time violations typically result in a warning and
                    content removal. Users are notified via email and in-app
                    notifications about the violation.
                  </Typography>
                  <Typography variant="body2">
                    Warnings include specific details about the violation and
                    guidance on how to avoid future issues.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">
                    Temporary Suspensions
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" paragraph>
                    Repeated violations or serious first-time offenses may
                    result in temporary account suspension.
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Suspension periods range from 24 hours to 30 days depending
                    on the severity and frequency of violations.
                  </Typography>
                  <Typography variant="body2">
                    During suspension, users cannot post content, comment, or
                    interact with other users.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">Permanent Bans</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" paragraph>
                    Severe violations, repeated serious offenses, or failure to
                    comply with temporary suspensions may result in permanent
                    account termination.
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Permanent bans are applied for:
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText
                        primary="• Severe harassment or threats"
                        secondary="Direct threats of violence or harm"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="• Child exploitation content"
                        secondary="Any content involving minors"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="• Terrorism or extremism"
                        secondary="Content promoting violent extremism"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="• Repeated violations"
                        secondary="Multiple serious violations after warnings"
                      />
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">Appeal Process</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" paragraph>
                    Users can appeal enforcement actions within 30 days of the
                    decision.
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Appeals are reviewed by our safety team and may result in:
                  </Typography>
                  <Typography variant="body2">
                    • Reversal of the enforcement action
                    <br />
                    • Reduction of suspension duration
                    <br />• Upholding of the original decision with additional
                    explanation
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>

            {/* Safety Tools */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Safety Tools
              </Typography>

              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Block Users"
                />
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ ml: 4, color: "text.secondary" }}
                >
                  Prevent specific users from contacting you or viewing your
                  content.
                </Typography>

                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Mute Keywords"
                />
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ ml: 4, color: "text.secondary" }}
                >
                  Hide content containing specific words or phrases from your
                  feed.
                </Typography>

                <FormControlLabel
                  control={<Checkbox />}
                  label="Private Account"
                />
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ ml: 4, color: "text.secondary" }}
                >
                  Make your account private so only approved followers can see
                  your content.
                </Typography>
              </FormGroup>
            </Box>
          </>
        );

      case "Content":
        return (
          <>
            <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
              Customize your content experience by managing filters,
              preferences, and content recommendations.
            </Typography>

            {/* Content Filters */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Content Filters
              </Typography>

              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Filter violent content"
                />
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ ml: 4, color: "text.secondary", mb: 1 }}
                >
                  Hide content containing graphic violence, gore, or disturbing
                  imagery.
                </Typography>

                <FormControlLabel
                  control={<Checkbox />}
                  label="Filter explicit or sexual content"
                />
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ ml: 4, color: "text.secondary", mb: 1 }}
                >
                  Hide adult content, nudity, or sexually explicit material.
                </Typography>

                <FormControlLabel
                  control={<Checkbox />}
                  label="Filter hate speech or harassment"
                />
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ ml: 4, color: "text.secondary", mb: 1 }}
                >
                  Hide content promoting discrimination, hate speech, or
                  targeted harassment.
                </Typography>

                <FormControlLabel
                  control={<Checkbox />}
                  label="Filter political content"
                />
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ ml: 4, color: "text.secondary", mb: 1 }}
                >
                  Reduce political posts and advertisements in your feed.
                </Typography>

                <FormControlLabel
                  control={<Checkbox />}
                  label="Filter sponsored content"
                />
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ ml: 4, color: "text.secondary" }}
                >
                  Hide or reduce the visibility of paid advertisements and
                  sponsored posts.
                </Typography>
              </FormGroup>
            </Box>

            {/* Content Categories */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Preferred Content Categories
              </Typography>

              <FormGroup row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Technology"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Entertainment"
                />
                <FormControlLabel control={<Checkbox />} label="Sports" />
                <FormControlLabel control={<Checkbox />} label="News" />
                <FormControlLabel control={<Checkbox />} label="Education" />
                <FormControlLabel control={<Checkbox />} label="Gaming" />
                <FormControlLabel control={<Checkbox />} label="Music" />
                <FormControlLabel control={<Checkbox />} label="Travel" />
              </FormGroup>
            </Box>
          </>
        );

      case "Privacy":
        return (
          <>
            <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
              Control your privacy settings and manage how your information is
              shared with others.
            </Typography>

            {/* Profile Privacy */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Profile Privacy
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={locationSharing}
                    onChange={(e) => {
                      setLocationSharing(e.target.checked);
                      if (onLocationSharingChange) {
                        onLocationSharingChange(e.target.checked);
                      }
                    }}
                  />
                }
                label="Share my location"
              />
              <Typography
                variant="caption"
                display="block"
                sx={{ ml: 4, color: "text.secondary", mb: 2 }}
              >
                Allow others to see your general location in your profile and
                posts.
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={adPersonalization}
                    onChange={(e) => setAdPersonalization(e.target.checked)}
                  />
                }
                label="Enable Ad Personalization"
              />
              <Typography
                variant="caption"
                display="block"
                sx={{ ml: 4, color: "text.secondary", mb: 2 }}
              >
                Use your activity to show relevant advertisements.
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                  />
                }
                label="Show email to other users"
              />
              <Typography
                variant="caption"
                display="block"
                sx={{ ml: 4, color: "text.secondary" }}
              >
                Allow other users to see your email address in your profile.
              </Typography>
            </Box>

            {/* Activity Privacy */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Activity Privacy
              </Typography>

              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Show when I'm online"
                />
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ ml: 4, color: "text.secondary", mb: 1 }}
                >
                  Display your online status to other users.
                </Typography>

                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Show my activity status"
                />
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ ml: 4, color: "text.secondary", mb: 1 }}
                >
                  Let others see when you're active on the platform.
                </Typography>

                <FormControlLabel
                  control={<Checkbox />}
                  label="Show my followers list"
                />
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ ml: 4, color: "text.secondary", mb: 1 }}
                >
                  Make your followers and following lists public.
                </Typography>

                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Show my likes and comments"
                />
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ ml: 4, color: "text.secondary" }}
                >
                  Display your likes and comments on your profile.
                </Typography>
              </FormGroup>
            </Box>

            {/* Data Sharing */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Data Sharing Controls
              </Typography>

              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Allow search engines to index my profile"
                />
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ ml: 4, color: "text.secondary", mb: 1 }}
                >
                  Make your profile discoverable through search engines.
                </Typography>

                <FormControlLabel
                  control={<Checkbox />}
                  label="Share analytics with content creators"
                />
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ ml: 4, color: "text.secondary", mb: 1 }}
                >
                  Allow content creators to see engagement data for their posts.
                </Typography>

                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Use data for research and development"
                />
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ ml: 4, color: "text.secondary" }}
                >
                  Help improve our services by allowing anonymous data usage for
                  research.
                </Typography>
              </FormGroup>
            </Box>
          </>
        );

      // case "Your Preferences":
      //   return (
      //     <>
      //       <Typography variant="body1" gutterBottom>
      //         Customize your experience.
      //       </Typography>
      //       <FormControl fullWidth sx={{ mb: 2 }}>
      //         <InputLabel>Language</InputLabel>
      //         <Select
      //           value={language}
      //           onChange={(e) => setLanguage(e.target.value)}
      //           label="Language"
      //         >
      //           <MenuItem value="en">English</MenuItem>
      //           <MenuItem value="es">Spanish</MenuItem>
      //           <MenuItem value="zh">Chinese</MenuItem>
      //         </Select>
      //       </FormControl>

      //       <FormControlLabel
      //         control={
      //           <Switch
      //             checked={darkMode}
      //             onChange={(e) => setDarkMode(e.target.checked)}
      //           />
      //         }
      //         label="Dark Mode"
      //       />

      //       <FormControlLabel
      //         control={
      //           <Switch
      //             checked={emailNotifications}
      //             onChange={(e) => setEmailNotifications(e.target.checked)}
      //           />
      //         }
      //         label="Receive Email Notifications"
      //       />
      //     </>
      // );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Settings
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ display: "flex", minHeight: "600px" }}>
        {/* Sidebar */}
        <Box sx={{ width: "250px", borderRight: "1px solid #ddd", pr: 1 }}>
          <List disablePadding>
            {menuItems.map((item) => (
              <ListItemButton
                key={item}
                selected={selected === item}
                onClick={() => setSelected(item)}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            ))}
          </List>
        </Box>

        {/* Content Area */}
        <Box sx={{ flexGrow: 1, pl: 3, pr: 2 }}>
          <Typography variant="h6" gutterBottom>
            {selected}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {renderContent()}
        </Box>
      </DialogContent>

      {/* Task Completion Modal */}
      <TaskCompletionModal
        id={id}
        open={taskCompletionModalOpen}
        targetTaskType={currentTask?.taskType}
        onClose={() => setTaskCompletionModalOpen(false)}
      />
    </Dialog>
  );
};
