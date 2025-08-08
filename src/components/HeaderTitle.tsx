interface Props {
  text: string;
  subText?: string;
}

export function HeaderTitle(props: Props) {
  const { text, subText } = props;

  return (
    <div className="flex flex-col py-5 gap-2">
      <h1 className="font-semibold drop-shadow-md text-2xl">{text}</h1>
      <p className="text-sm text-primary/50">{subText}</p>
    </div>
  );
}
