import { Icon } from "../ui/Icon";
import type { IconsName } from "../ui/iconUtils";

interface StepTitleProps {
  title: string;
  icon: string;
}

export default function StepTitle({ title, icon }: StepTitleProps) {
  return (
    <div className="flex items-center gap-[15px]">
      <Icon
        name={icon as IconsName}
        size={26}
        className="text-[var(--color-text-heading)] flex-shrink-0"
      />
      <h2 className="text-[22px] font-semibold text-[var(--color-text-heading)] leading-tight">
        {title}
      </h2>
    </div>
  );
}
