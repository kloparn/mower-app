import React from 'react';
import VerticalSlider from 'rn-vertical-slider';

const MotorSlider = ({left, value}) => {
  return (
    <VerticalSlider
      value={50}
      disabled={false}
      min={0}
      max={100}
      onChange={(value) => {
        //TODO: Send command to robot, with new value.
        console.log('CHANGE', value);
      }}
      width={50}
      height={300}
      step={1}
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
