import React from 'react';
import {Button} from 'react-native';
import {useStoreState, useStoreActions} from 'easy-peasy';

/*
  TRACE:: #A1.2.5 -> Input screen for the mower.
*/

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
