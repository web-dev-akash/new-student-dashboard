/* eslint-disable react/prop-types */
import _ from "lodash";

const Separator = (props) => {
  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        transform: `rotate(${props.turns}turn)`,
      }}
    >
      <div style={props.style} />
    </div>
  );
};

export const RadialSeparators = (props) => {
  const turns = 1 / props.count;
  return _.range(props.count).map((index) => (
    <Separator key={index} turns={index * turns} style={props.style} />
  ));
};
