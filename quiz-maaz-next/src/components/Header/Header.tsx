import Text from '../Text';

type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  return (
    <div>
      <Text>{title}</Text>
    </div>
  );
}
