import React from 'react';
import {Button} from 'react-native';
import {useStoreState, useStoreActions} from 'easy-peasy';

const SendBTButton = ({msg, text}) => {
  const {sendCommandToRobot} = useStoreActions((state) => state.bluetooth);

  return (
    <Button
      title={text}
      onPress={() => {
        sendCommandToRobot(msg);
      }}
    />
  );
};

export default SendBTButton;
