type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={`bg-white flex flex-col p-6 rounded-md shadow-md gap-4 ${className}`}>
      {children}
    </div>
  );
};
