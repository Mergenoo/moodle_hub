import type { MainContentProps } from "../props";

export function MainContent({ children }: MainContentProps) {
  return <div className="mx-auto w-full max-w-grid px-4 pb-16 tablet:px-6 laptop:px-0">{children}</div>;
}
