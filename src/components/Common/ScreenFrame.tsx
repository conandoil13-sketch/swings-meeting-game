import { PropsWithChildren } from "react";

type ScreenFrameProps = PropsWithChildren<{
  className?: string;
}>;

export function ScreenFrame({ children, className = "" }: ScreenFrameProps) {
  return <main className={`screen-frame ${className}`.trim()}>{children}</main>;
}
