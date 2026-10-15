import type { PageHeaderProps } from "../props";

export function PageHeader({ title, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-4 pb-8 pt-10 tablet:pt-16">
      <h1 className="text-center text-[2rem] font-extrabold leading-tight text-ink tablet:text-display">{title}</h1>
      {actions}
    </div>
  );
}
