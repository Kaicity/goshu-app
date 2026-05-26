interface Props {
  title: string;
  subTitle?: string;
  center?: boolean;
  className?: string;
}

const Title = ({ title, subTitle, center = false, className = '' }: Props) => {
  return (
    <div
      className={`
        space-y-2 pb-10
        ${center ? 'text-center' : 'text-left'}
        ${className}
      `}
    >
      <h2 className="text-2xl md:text-3xl font-semibold text-foreground">{title}</h2>

      {subTitle && <p className="text-sm md:text-base text-gray-500 max-w-2xl">{subTitle}</p>}
    </div>
  );
};

export default Title;
