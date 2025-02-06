"use client";

import { ErrorsMessages } from "./errors-messages";
import { OrderMessages } from "./orders-messages";
import { StateMessages } from "./state-messages";

export const DashboardMessages = () => {
  return (
    <>
      <OrderMessages />
      <ErrorsMessages />
      <StateMessages />
    </>
  );
};
