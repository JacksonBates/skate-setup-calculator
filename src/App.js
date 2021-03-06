import React, { useState } from "react";
import { Radio, Col } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

import "./App.css";
import "antd/dist/antd.css";

function App() {
  const [speed, setSpeed] = useState(0);
  const [acceleration, setAcceleration] = useState(0);
  const [stability, setStability] = useState(0);
  const [manouverability, setManoueverability] = useState(0);
  const [comfort, setComfort] = useState(0);
  const [wheelSize, setWheelSize] = useState(6);
  const [wheelDuro, setWheelDuro] = useState(4);
  const [deckWidth, setDeckWidth] = useState(3);
  const [concave, setConcave] = useState(2);
  const [abec, setAbec] = useState(2);
  const wheelSizes = [
    { label: "< 50mm", value: 1 },
    { label: "50mm", value: 2 },
    { label: "51mm", value: 3 },
    { label: "52mm", value: 4 },
    { label: "53mm", value: 5 },
    { label: "54mm", value: 6 },
    { label: "55mm", value: 7 },
    { label: "56mm", value: 8 },
    { label: "57mm", value: 9 },
    { label: "58mm", value: 10 },
    { label: "59mm", value: 11 },
    { label: "60mm", value: 12 },
    { label: "> 60mm", value: 13 },
  ];

  const wheelDuros = [
    { label: "< 78a", value: 1 },
    { label: "78a - 87a", value: 2 },
    { label: "88a - 95a", value: 3 },
    { label: "96a - 99a", value: 4 },
    { label: "100a - 101a", value: 5 },
    { label: "83b >", value: 6 },
  ];

  const deckWidths = [
    { label: '< 7.5"', value: 1 },
    { label: '7.5"', value: 2 },
    { label: '8"', value: 3 },
    { label: '8.25"', value: 4 },
    { label: '8.5"', value: 5 },
    { label: '8.75"', value: 6 },
    { label: '9"', value: 7 },
    { label: '9.5"', value: 8 },
    { label: '10"', value: 9 },
    { label: '>10"', value: 10 },
  ];

  const concaves = [
    { label: "Flat", value: 1 },
    { label: "Mellow", value: 2 },
    { label: "Medium", value: 3 },
    { label: "Steep", value: 4 },
  ];

  const abecs = [
    { label: "ABEC 1", value: 1 },
    { label: "ABEC 3", value: 2 },
    { label: "ABEC 5", value: 3 },
    { label: "ABEC 7", value: 4 },
    { label: "ABEC 9", value: 5 },
  ];

  const data = [
    { name: "Speed", score: speed },
    { name: "Acceleration", score: acceleration },
    { name: "Stability", score: stability },
    { name: "Manoueverability", score: manouverability },
    { name: "Comfort", score: comfort },
  ];

  React.useEffect(() => {
    const speedValue = wheelSize * 1.1 + wheelDuro + abec * 1.7;
    setSpeed(speedValue);
  }, [wheelSize, wheelDuro, abec]);

  React.useEffect(() => {
    const accelerationValue = (1 + wheelSizes.at(-1).value - wheelSize) * 2;
    setAcceleration(accelerationValue);
  }, [wheelSizes, wheelSize]);

  React.useEffect(() => {
    const stabilityValue = deckWidths.at(-1).value + deckWidth - concave * 2;
    setStability(stabilityValue);
  }, [deckWidth, concave, deckWidths]);

  React.useEffect(() => {
    const manoueverabilityValue =
      concave * 2 + deckWidths.at(-1).value - deckWidth;
    setManoueverability(manoueverabilityValue);
  }, [deckWidth, concave, deckWidths]);

  React.useEffect(() => {
    const comfortValue =
      (1+ wheelDuros.at(-1).value +
      concaves.at(-1).value -
      wheelDuro  -
      concave) * 3;
    setComfort(comfortValue);
  }, [concave, wheelDuro, concaves, wheelDuros]);

  return (
    <React.Fragment>
      <Col sm={24}>
        Wheel Size
        <br />
        <Radio.Group
          options={wheelSizes}
          optionType="button"
          buttonStyle="solid"
          onChange={(e) => setWheelSize(e.target.value)}
          value={wheelSize}
        />
      </Col>
      <Col sm={24}>
        Wheel Durometer
        <br />
        <Radio.Group
          options={wheelDuros}
          optionType="button"
          buttonStyle="solid"
          onChange={(e) => setWheelDuro(e.target.value)}
          value={wheelDuro}
        />
      </Col>
      <Col sm={24}>
        Deck Width
        <br />
        <Radio.Group
          options={deckWidths}
          optionType="button"
          buttonStyle="solid"
          onChange={(e) => setDeckWidth(e.target.value)}
          value={deckWidth}
        />
      </Col>
      <Col sm={24}>
        Concave
        <br />
        <Radio.Group
          options={concaves}
          optionType="button"
          buttonStyle="solid"
          onChange={(e) => setConcave(e.target.value)}
          value={concave}
        />
      </Col>
      <Col sm={24}>
        Bearings ABEC
        <br />
        <Radio.Group
          options={abecs}
          optionType="button"
          buttonStyle="solid"
          onChange={(e) => setAbec(e.target.value)}
          value={abec}
        />
      </Col>
      <br />
      <BarChart
        width={800}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis domain={[0, 31]} hide />
        <Bar dataKey="score" fill="#8884d8" />
      </BarChart>
    </React.Fragment>
  );
}

export default App;
