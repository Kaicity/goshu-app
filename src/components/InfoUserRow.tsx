interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow = ({ label, value }: InfoRowProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center py-1">
      <span className="text-muted-foreground text-sm font-medium w-40">{label}</span>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  );
};

export default InfoRow;
