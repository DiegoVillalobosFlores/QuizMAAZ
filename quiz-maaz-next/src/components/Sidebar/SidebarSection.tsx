import { useState } from 'react';
import Text from '../Text';

type Props = {
  title: string;
  items: Array<string>;
  onItemClick?(index: number): void;
};

export default function SidebarSection({ title, items, onItemClick }: Props) {
  const [selectedItem, setSelectedItem] = useState<number|null>();

  function handleClick(index: number) {
    onItemClick(index);
    setSelectedItem(index);
  }

  return (
    <div>
      <Text>{title}</Text>
      {items.map(
        (item, index) => (
          <div key={item} onClick={() => handleClick(index)}>
            <Text className="hover:textColor-white">{item}</Text>
          </div>
        ),
      )}
    </div>
  );
}
