"use client";

import React, { ReactNode } from "react";



type Props = {
  children: ReactNode;
};

export default function SectionFullScreen({ children }: Props) {
  // const darkMode = useAppSelector((state) => state.darkMode.isEnabled);

  // let componentClass = "flex min-h-screen items-center justify-center ";

  // if (darkMode) {
  //   componentClass += gradientBgDark;
  // } else if (bg === "purplePink") {
  //   componentClass += gradientBgPurplePink;
  // } else if (bg === "pinkRed") {
  //   componentClass += gradientBgPinkRed;
  // }

  return <div className={'flex min-h-screen items-center justify-center'}>{children}</div>;
}
