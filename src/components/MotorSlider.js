import React, {useState} from 'react';
import VerticalSlider from 'rn-vertical-slider';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {Value} from 'react-native-reanimated';

/*
  TRACE:: #A1.2.5 -> Input screen for the mower.
  TRACE:: #A1.2.6 -> Bluetooth commands for sending the user inputs
*/
const MotorSlider = ({left}) => {
  const {setMotor, sendCommand} = useStoreActions((state) => state.bluetooth);
  const {leftMotor, rightMotor} = useStoreState((state) => state.bluetooth);
  const currentMotorValue = left ? leftMotor : rightMotor;
  return (
    <VerticalSlider
      value={currentMotorValue}
      disabled={false}
      min={-100}
      max={100}
      onChange={(value) => {
        //TODO: Send command to robot, with new value.
        if (value !== currentMotorValue) {
          // Set the right motor value
          setMotor({left, value});
          // send correct thing
          if (left) sendCommand({d: 2, lm: value, rm: rightMotor});
          else sendCommand({d: 2, lm: leftMotor, rm: value});
        }
      }}
      width={50}
      height={300}
      step={5}
      borderRadius={5}
      minimumTrackTintColor={'#8ecccc'}
      maximumTrackTintColor={'#50717b'}
      showBallIndicator
      ballIndicatorPosition={left ? -53 : 55}
      ballIndicatorColor={'#8ecccc'}
      ballIndicatorTextColor={'white'}
    />
  );
};

export default MotorSlider;
