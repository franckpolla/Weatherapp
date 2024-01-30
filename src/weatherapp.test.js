// WeatherApp.test.js
import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WeatherApp from "./WeatherApp";

describe("WeatherApp component", () => {
  test("renders WeatherApp component with default data", () => {
    render(<WeatherApp />);

    // Add assertions based on your component's structure
    expect(screen.getByText("Humidity")).toBeInTheDocument();
    expect(screen.getByText("Wind Speed")).toBeInTheDocument();
    expect(screen.getByText("Nicosia")).toBeInTheDocument();
    expect(screen.getByAltText("imgae")).toBeInTheDocument();
  });

  test("handles input and button click", async () => {
    render(<WeatherApp />);
    const input = screen.getByPlaceholderText("Search");
    const button = screen.getByAltText("search-icon");

    fireEvent.change(input, { target: { value: "Berlin" } });
    fireEvent.click(button);

    // Wait for the API call to complete (you might need to adjust the timing based on your API response time)
    await waitFor(() => expect(screen.getByText("Berlin")).toBeInTheDocument());
    expect(screen.getByAltText("imgae")).toBeInTheDocument(); // Assuming the image updates based on the API response
  });

  test("displays error message for invalid city", async () => {
    render(<WeatherApp />);
    const input = screen.getByPlaceholderText("Search");
    const button = screen.getByAltText("search-icon");

    fireEvent.change(input, { target: { value: "InvalidCityName" } });
    fireEvent.click(button);

    // Wait for the API call to complete
    await waitFor(() =>
      expect(
        screen.getByText("Unable to find the city InvalidCityName")
      ).toBeInTheDocument()
    );
  });

  // Add more test cases to cover other functionalities and edge cases

  // Example test for checking the rendering of specific weather icons based on temperature
  test("renders Snow_icon for low temperatures", () => {
    const { container } = render(<WeatherApp />);
    const snowIcon = container.querySelector(
      'img[src="path/to/snow-icon.png"]'
    );
    expect(snowIcon).toBeInTheDocument();
  });

  // Add more tests for rendering different icons based on temperature ranges
});
