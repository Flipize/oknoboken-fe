interface CardProps {
  title: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="w-[95%] sm:w-[90%] md:w-[80%] mx-auto mt-4 bg-white shadow-xl rounded-2xl p-6">
      <h1 className="h1-text-font text-center p-[10px] mb-4">{title}</h1>
      {children}
    </div>
  );
};

export default Card;
