import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "gradient";
}

export function Card({
  className,
  children,
  variant = "default",
  ...props
}: CardProps) {
  const variants = {
    default:
      "bg-gradient-to-br from-secondary-900/90 to-secondary-800/90 backdrop-blur-sm border border-secondary-800 rounded-2xl",
    gradient:
      "bg-gradient-to-br from-primary-500/10 to-secondary-500/10 backdrop-blur-sm border border-primary-500/20 rounded-2xl",
  };

  return (
    <div className={cn(variants[variant], className)} {...props}>
      {children}
    </div>
  );
}
