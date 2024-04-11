# Countdown Timer Web Component

A simple yet customizable countdown timer web component that can be easily integrated into any web project. This component is designed to display a countdown to a specified date, complete with a customizable heading, subheading, and theme.

## Features

- **Dynamic Countdown**: Counts down to a specified date and time.
- **Customizable**: Allows setting a heading, subheading, and theme via attributes.
- **Responsive Design**: Adapts to different screen sizes for optimal viewing.
 - **Light/Dark Themes**: Supports "dark" and "light" themes to match your site's design.

## Installation

To use the `countdown-timer` in your project, simply include the JavaScript file that contains the class definition for the component. A CDN link is provided below for easy integration:

```html
<script src="https://www.unpkg.com/@allensulzen/countdown-timer@latest/countdown-timer.min.js"></script>
```

## Usage

To add a countdown timer to your webpage, you can include the countdown-timer element with the desired attributes:

```html
<countdown-timer
    date="YYYY-MM-DDThh:mm:ss"
    heading="Event Starts In"
    subheading="Don't miss out!"
    theme="dark"
    message="The event has begun!"
    link="https://example.com"
    linktext="Learn More"
></countdown-timer>

```

## Attributes

 - `date` (required): The target date and time for the countdown. Format: YYYY-MM-DDThh:mm:ss.
 - `heading` (optional): A heading text displayed above the countdown.
 - `subheading` (optional): A subheading text displayed below the countdown.
 - `theme` (optional): Theme for the countdown timer. Currently supports "dark" and "light" (default).
  - `message` (optional): A message displayed when the countdown reaches zero.
 - `link` (optional): A URL for a page to visit when the countdown is complete.
 - `linktext` (optional): The text for the link displayed after the countdown ends.

## Styling

The component can be styled further using CSS. It is structured to allow easy customization of its parts. Here are some classes you can target:

 - `.countdown-timer__title`: The container for the heading.
 - `.countdown-timer__content`: The container for the countdown counters.
 - `.countdown-timer__content__counter`: The individual counter for days, hours, minutes, and  - seconds.
 - `.countdown-timer__content__counter.skeleton`: Targets the skeleton screen counters for loading state.
 - `.countdown-timer__label`: The container for the subheading.

 The component does not use shadow DOM, so you can style it as you please.

```css
.countdown-timer.theme--dark .countdown-timer__content__counter {
    background-color: #333;
    color: #fff;
}
```

## Methods

 - `startTimer()`: Starts the countdown timer.
 - `stopTimer()`: Stops the countdown timer.

## Browser Compatibility

The `countdown-timer` component is built with standard web technologies, making it compatible with most modern browsers that support Web Components and Custom Elements.