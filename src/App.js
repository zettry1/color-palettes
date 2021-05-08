import React, { useState } from "react";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePallete } from "./colorHelpers";
import { Route, Switch } from "react-router-dom";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import "./App.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";
function App() {
  const savePalettes = JSON.parse(window.localStorage.getItem("palettes"));
  console.log("savePalettes", savePalettes);

  const [palettes, setPalettes] = useState(savePalettes || seedColors);
  const findPallet = (id) => {
    return palettes.find(function (palette) {
      return palette.id === id;
    });
  };

  const deletePalette = (id) => {
    setPalettes(
      (prevstate) => prevstate.filter((palette) => palette.id !== id),
      syncLocalStorage(palettes)
    );
  };
  const savePalette = (newPalette) => {
    setPalettes((prevPalettes) => [...prevPalettes, newPalette]);
    syncLocalStorage([...palettes, newPalette]);
  };

  const syncLocalStorage = (addedPalettes) => {
    window.localStorage.setItem("palettes", JSON.stringify(addedPalettes));
  };
  return (
    <div>
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition classNames="fade" timeout={500} key={location.key}>
              <Switch location={location}>
                <Route
                  exact
                  path="/palette/new"
                  render={(routeProps) => (
                    <div className="page">
                      <NewPaletteForm
                        palettes={palettes}
                        savePalette={savePalette}
                        {...routeProps}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/"
                  render={(routeProps) => (
                    <div className="page">
                      <PaletteList
                        palletes={palettes}
                        {...routeProps}
                        deletePalette={deletePalette}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/palette/:id"
                  render={(routeProps) => (
                    <div className="page">
                      <Palette
                        palette={generatePallete(
                          findPallet(routeProps.match.params.id)
                        )}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/palette/:paletteId/:colorId"
                  render={(routeProps) => (
                    <div className="page">
                      <SingleColorPalette
                        colorId={routeProps.match.params.colorId}
                        palette={generatePallete(
                          findPallet(routeProps.match.params.paletteId)
                        )}
                      />
                    </div>
                  )}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </div>
  );
}

export default App;
