import React from "react";
import LoadingScreen from "react-loading-screen";

export default function Loading() {
  return (
    <LoadingScreen
      loading={true}
      bgColor="#f2f2f2"
      spinnerColor="#07cbed"
      textColor="black"
      text="Loading..."
      spinner={true}
    />
  );
}
