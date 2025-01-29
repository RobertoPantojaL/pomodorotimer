import React from "react"
import { MantineProvider } from "@mantine/core"
import PomodoroTimer from "./components/PomodoroTimer"

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div className="App">
        <PomodoroTimer />
      </div>
    </MantineProvider>
  )
}

export default App

