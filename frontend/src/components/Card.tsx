type CardProps = {
  children: React.ReactNode;
  className?: string;
  row?: boolean;
};

export const Card = ({ children, className, row = false }: CardProps) => {
  return (
    <div
      className={`flex ${
        row ? "flex-row" : "flex-col"
      } bg-white p-6 rounded-md shadow-md gap-4 ${className}`}>
      {children}
    </div>
  );
};
