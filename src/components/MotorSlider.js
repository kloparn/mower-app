import React, {useState} from 'react';
import VerticalSlider from 'rn-vertical-slider';
import {useStoreState, useStoreActions} from 'easy-peasy';

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
      min={0}
      max={180}
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
      minimumTrackTintColor={'#17b978'}
      maximumTrackTintColor={'#086972'}
      showBallIndicator
      ballIndicatorPosition={left ? -53 : 55}
      ballIndicatorColor={'#17b978'}
      ballIndicatorTextColor={'white'}
    />
  );
};

export default MotorSlider;
