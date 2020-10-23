import { format } from "path";
import React from "react";
import { render } from "@testing-library/react";
import index from "./index";

describe("Play Button testing", () => {
  test("Changes state of playing to true or false", () => {
    const {getByTest} = render(<Player />);
    const linkElement = getByText("progress bar goes here");
    expect(linkElement).toBeInTheDocument();
  });
});