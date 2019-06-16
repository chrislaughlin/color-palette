import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import "./styles.css";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ColorPickers = styled.div`
  display: flex;
  flex-direction: column;
  width: 100px;
  align-items: center;
`;

const PalletList = styled.ul`
  list-style: none;
`;

const PalletItem = styled.li`
  height: 50px;
  background-color: ${props => props.color};
  padding: 25px;
  width: 200px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
`;

function App() {
  const [mainColor, setMainColor] = useState("#e66465");
  const [secondColor, setSecondColor] = useState("#303ADF");
  const [pallet, setPallet] = useState([]);

  useEffect(() => {
    window
      .fetch(
        `https://api.noopschallenge.com/hexbot?count=5&seed=${mainColor.replace(
          "#",
          ""
        )},${secondColor.replace("#", "")}`
      )
      .then(data => data.json())
      .then(data => {
        setPallet(data.colors.map(color => color.value));
      });
  }, [mainColor, secondColor]);

  return (
    <AppContainer className="App">
      <h1>Color Palette Gen</h1>
      <ColorPickers>
        <input
          type="color"
          id="main"
          name="main"
          value={mainColor}
          onChange={evt => setMainColor(evt.target.value)}
        />
        <label for="main">Main Color: {mainColor}</label>
        <input
          type="color"
          id="second"
          name="second"
          value={secondColor}
          onChange={evt => setSecondColor(evt.target.value)}
        />
        <label for="second">Second Color: {secondColor}</label>
      </ColorPickers>
      <div>
        {pallet.length > 0 && (
          <PalletList>
            {pallet.map(color => {
              return <PalletItem color={color}>{color}</PalletItem>;
            })}
          </PalletList>
        )}
      </div>
    </AppContainer>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
