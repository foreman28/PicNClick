import {Typography} from "antd";

const {Title, Text} = Typography;

type Props = {
  title: string;
  level: 1 | 2 | 3 | 4 | 5 | undefined;
};

export const CustomTitle = (
  {
    title,
    level = 1
  }: Props) => {
  return (
    <div className={"item"}>
      <Title level={level}>{title}</Title>
    </div>
  );
};
