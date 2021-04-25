import Quiz from 'types/Quiz';
import React from 'react';
import Text from '../Text';
import Card from '../Card';

type Props = {
  quiz: Quiz;
  id: string;
};

export default function Admin({ id, quiz }: Props) {
  return (
    <Card className="grid grid-cols-3 gap-4">
      <Text className="col-span-2">
        {quiz.name}
      </Text>
      <Text>
        {id}
      </Text>
    </Card>
  );
}
