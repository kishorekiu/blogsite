"use client";
import React, { useRef } from "react";
import { AppStore, makeStore } from "../lib/store";
import { Provider } from "react-redux";

const StoreProvider = ({
  isAuth,
  children,
}: {
  isAuth: boolean;
  children: React.ReactNode;
}) => {
  const storeRef = useRef<AppStore>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore({
      auth: { isAuth: isAuth },
    });
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
