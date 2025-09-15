export const DarkPatternType = {
  AddingSteps: "Adding Steps",
  BaitAndSwitch: "Bait and Switch",
  HidingInformation: "Hiding Information",
  ManipulatingVisualChoiceArchitecture:
    "Manipulating Visual Choice Architecture",
  BadDefault: "Bad Default",
  EmotionalOrSensoryManipulation: "Emotional or Sensory Manipulation",
  TrickQuestions: "Trick Questions",
  ChoiceOverload: "ChoiceOverload",
  HiddenInformation: "Hidden Information",
  Nagging: "Nagging",
  ForcedRegistration: "Forced Registration",
  ForcedCommunicationOrDisclosure: "Forced Communication or Disclosure",
  ScarcityAndPopularityClaims: "Scarcity and Popularity Claims",
  SocialProof: "Social Proof",
  Urgency: "Urgency",
  Shaming: "Shaming",
};

export const TaskType = {
  BuyProduct: "Buy Product",
  CancelMembership: "Cancel Membership",
  SignSubscription: "Sign Subscription",
  CancelSubscription: "Cancel Subscription",
  WatchVideo: "Watch Video",
  CancelRecommendation: "CancelRecommendation",
};

export const AvoidBehaviors = {
  SkipTask: "Skip the task",
  DidNotClickAd: "Did not click ad",
  RemovedExtraProduct: "Removed the extra product",
  SelectedStandardShipping: "Selected standard shipping",
  OptedOutManually: "Opted out manually",
  ChoseOtherProducts: "Chose other products",
  ChoseStandardShipping: "Chose standard shipping",
  LeftBoxUnchecked: "Left box unchecked",
  ConsistentlySelectedNo: 'Consistently selected "no"',
  AlwaysSelectedYes: 'Selected "Yes"',
  SelectedYes: 'Selected "Yes"',
  CancelRecommendation: "CancelRecommendation",
};

export const DomainType = {
  ECommerce: "e-commerce",
  SocialMedia: "social media",
  VideoStream: "video stream",
};

export const tasks = [
  {
    id: 1,
    title:
      "You are currently a premium member of the shopping website, but you no longer wish to continue. Navigate through the account information and cancel your premium membership subscription.",
    taskType: TaskType.CancelMembership,
    type: DarkPatternType.AddingSteps,
    avoidBehavior: AvoidBehaviors.SkipTask,
    domain: DomainType.ECommerce,
  },
  {
    id: 2,
    title: "You need to buy a pack of trash bags from the shopping website.",
    taskType: TaskType.BuyProduct,
    type: DarkPatternType.BaitAndSwitch,
    avoidBehavior: AvoidBehaviors.DidNotClickAd,
    domain: DomainType.ECommerce,
  },
  {
    id: 3,
    title: "You need to buy a pack of paper towels from the shopping website.",
    taskType: TaskType.BuyProduct,
    type: DarkPatternType.HidingInformation,
    avoidBehavior: AvoidBehaviors.RemovedExtraProduct,
    domain: DomainType.ECommerce,
  },
  {
    id: 4,
    title: "You need to buy packing tape from the shopping website.",
    taskType: TaskType.BuyProduct,
    type: DarkPatternType.ManipulatingVisualChoiceArchitecture,
    avoidBehavior: AvoidBehaviors.SelectedStandardShipping,
    domain: DomainType.ECommerce,
  },
  {
    id: 5,
    title: "Subscribe to DoraemonDiaries on social media",
    taskType: TaskType.SignSubscription,
    type: DarkPatternType.BadDefault,
    avoidBehavior: AvoidBehaviors.OptedOutManually,
    domain: DomainType.SocialMedia,
  },
  {
    id: 6,
    title: "Purchase a bottle of melatonin gummies from the shopping website.",
    taskType: TaskType.BuyProduct,
    type: DarkPatternType.EmotionalOrSensoryManipulation,
    avoidBehavior: AvoidBehaviors.ChoseOtherProducts,
    domain: DomainType.ECommerce,
  },
  {
    id: 7,
    title: "Subscribe to CornerMuse on social media",
    taskType: TaskType.SignSubscription,
    type: DarkPatternType.TrickQuestions,
    avoidBehavior: AvoidBehaviors.LeftBoxUnchecked,
    domain: DomainType.SocialMedia,
  },
  {
    id: 8,
    title:
      "You're using a video streaming platform that has the access to your location. Navigate the settings and turn off location sharing.",
    taskType: TaskType.CancelRecommendation,
    tye: DarkPatternType.ChoiceOverload,
    domain: DomainType.VideoStream,
    avoidBehavior: AvoidBehaviors.CancelRecommendation,
  },
  {
    id: 9,
    title: "Buy a pack of disposable paper plates from the shopping website.",
    taskType: TaskType.BuyProduct,
    type: DarkPatternType.SocialProof,
    avoidBehavior: AvoidBehaviors.ChoseOtherProducts,
    domain: DomainType.ECommerce,
  },
  {
    id: 10,
    title:
      "You're using a video streaming platform. Navigate to the settings and enable auto-reporting for content that violates safety policies.",
    taskType: TaskType.WatchVideo,
    type: DarkPatternType.Nagging,
    avoidBehavior: AvoidBehaviors.AlwaysSelectedYes,
    domain: DomainType.VideoStream,
  },
  {
    id: 11,
    title: "Subscribe to HiddenHandsStudio on social media",
    taskType: TaskType.SignSubscription,
    type: DarkPatternType.ForcedCommunicationOrDisclosure,
    avoidBehavior: AvoidBehaviors.SkipTask,
    domain: DomainType.SocialMedia,
  },
  {
    id: 12,
    title: "Purchase a pack of staples from the shopping website.",
    taskType: TaskType.BuyProduct,
    type: DarkPatternType.ScarcityAndPopularityClaims,
    avoidBehavior: AvoidBehaviors.ChoseOtherProducts,
    domain: DomainType.ECommerce,
  },
  {
    id: 13,
    title:
      "You are watching a video on a streaming platform. Leave the comment 'Unforgettable!' under the video.",
    taskType: TaskType.WatchVideo,
    domain: DomainType.VideoStream,
    type: DarkPatternType.ForcedRegistration,
    avoidBehavior: AvoidBehaviors.SkipTask,
  },
  {
    id: 14,
    title: "Subscribe to ScreamEchoes on social media",
    taskType: TaskType.SignSubscription,
    type: DarkPatternType.HiddenInformation,
    avoidBehavior: AvoidBehaviors.SkipTask,
    domain: DomainType.SocialMedia,
  },
  {
    id: 15,
    title: "Purchase a set of paperclips from the shopping website.",
    taskType: TaskType.BuyProduct,
    type: DarkPatternType.Urgency,
    avoidBehavior: AvoidBehaviors.ChoseOtherProducts,
    domain: DomainType.ECommerce,
  },
  {
    id: 16,
    title: "Cancel your subscription of CornerMuse on social media.",
    taskType: TaskType.CancelSubscription,
    type: DarkPatternType.Shaming,
    avoidBehavior: AvoidBehaviors.SelectedYes,
    domain: DomainType.SocialMedia,
  },
];
export const getTasks = (userID) => {
  const n = tasks.length;
  const userIndex = parseInt(userID, 10);
  return tasks.map((_, i) => tasks[(i + userIndex - 1) % n]);
};

export const getUserVideoTaskConfig = (userID) => {
  const userIDInt = parseInt(userID, 10);
  return userIDInt % 2 === 0;
};

export const shouldPlayVideo = (userID, taskIndex) => {
  const config = getUserVideoTaskConfig(userID);
  if (config) {
    return taskIndex < 8;
  } else {
    return taskIndex >= 8;
  }
};
