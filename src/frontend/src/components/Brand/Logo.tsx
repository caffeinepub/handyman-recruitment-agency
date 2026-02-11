interface LogoProps {
  className?: string;
}

export default function Logo({ className = 'h-12 w-auto' }: LogoProps) {
  return (
    <img
      src="/assets/20260211_195621.png"
      alt="Handyman Recruitment Agency Logo"
      className={className}
    />
  );
}
