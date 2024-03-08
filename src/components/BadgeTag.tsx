type BadgeTagProps = {
    id?: string;
    name: string;
};

export const BadgeTag = (props: BadgeTagProps) => {
  const { id, name } = props;
  return (
    <div
      key={id || ""}
      className="cursor-pointer text-gray-600 rounded-xl bg-red-50 w-36  border text-sm border-red-600 text-center "
    >
      {name}
    </div>
  );
};
