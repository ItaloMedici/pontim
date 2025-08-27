import { sendGAEvent } from "@next/third-parties/google";

// User Events
const trackUserSignUp = (method: string) => {
  sendGAEvent({
    event: "sign_up",
    method,
  });
};

const trackUserLogin = (method: string) => {
  sendGAEvent({
    event: "login",
    method,
  });
};

// Room Events
const trackRoomCreated = () => {
  sendGAEvent({
    event: "room_created",
    event_category: "engagement",
    event_label: "room_creation",
  });
};

const trackRoomJoined = (roomId: string) => {
  sendGAEvent({
    event: "room_joined",
    event_category: "engagement",
    event_label: "room_participation",
    room_id: roomId,
  });
};

const trackVoteSubmitted = (choice: string | number) => {
  sendGAEvent({
    event: "vote_submitted",
    event_category: "engagement",
    event_label: "voting",
    choice: choice.toString(),
  });
};

const trackRoundRevealed = () => {
  sendGAEvent({
    event: "round_revealed",
    event_category: "engagement",
    event_label: "round_completion",
  });
};

const trackRoundReset = () => {
  sendGAEvent({
    event: "round_reset",
    event_category: "engagement",
    event_label: "round_reset",
  });
};

// Notification Events
const trackNotificationSent = () => {
  sendGAEvent({
    event: "notification_sent",
    event_category: "communication",
    event_label: "team_notification",
  });
};

// Subscription Events
const trackCheckoutStarted = ({
  price,
  currency,
  planName,
}: {
  price: number;
  currency: string;
  planName: string;
}) => {
  sendGAEvent({
    event: "begin_checkout",
    value: {
      currency: "BRL",
      value: price,
      items: [
        {
          item_id: planName,
          item_name: planName,
          price: price,
          quantity: 1,
          currency,
        },
      ],
    },
  });
};

const trackCheckoutPurchase = ({
  price,
  currency,
  planName,
}: {
  price: number;
  currency: string;
  planName: string;
}) => {
  sendGAEvent({
    event: "purchase",
    value: {
      currency: "BRL",
      value: price,
      items: [
        {
          item_id: planName,
          item_name: planName,
          price: price,
          quantity: 1,
          currency,
        },
      ],
    },
  });
};

// Engagement Events
const trackPageView = (title: string) => {
  sendGAEvent({
    event: "page_view",
    page_title: title,
    page_location: typeof window !== "undefined" ? window.location.href : "",
  });
};

const trackFeatureUsage = (feature: string) => {
  sendGAEvent({
    event: "feature_usage",
    event_category: "engagement",
    event_label: feature,
  });
};

// Error Tracking
const trackError = (error: string, location: string) => {
  sendGAEvent({
    event: "exception",
    description: error,
    fatal: false,
    location,
  });
};

// Session Duration Helper
const trackSessionDuration = (startTime: number) => {
  const duration = Date.now() - startTime;
  sendGAEvent({
    event: "timing_complete",
    name: "session_duration",
    value: Math.round(duration / 1000), // Convert to seconds
  });
};

export const Track = {
  user: {
    signUp: trackUserSignUp,
    login: trackUserLogin,
  },
  room: {
    created: trackRoomCreated,
    joined: trackRoomJoined,
  },
  vote: {
    submitted: trackVoteSubmitted,
  },
  round: {
    revealed: trackRoundRevealed,
    reset: trackRoundReset,
  },
  notification: {
    sent: trackNotificationSent,
  },
  subscription: {
    purchase: trackCheckoutPurchase,
    beginCheckout: trackCheckoutStarted,
  },
  engagement: {
    pageView: trackPageView,
    featureUsage: trackFeatureUsage,
  },
  error: {
    trackError,
  },
  session: {
    duration: trackSessionDuration,
  },
};
