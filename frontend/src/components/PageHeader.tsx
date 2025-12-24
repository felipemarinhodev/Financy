type PageHeaderProps = {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
};

export const PageHeader = ({ children, title, subtitle }: PageHeaderProps) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <span>{subtitle}</span>
      </div>
      {children}
    </div>
  );
};
