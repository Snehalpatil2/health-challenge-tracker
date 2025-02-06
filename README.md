
# Health Challenge Tracker

## Overview
The Health Challenge Tracker is a web application built with Angular 14 and Node.js 16. This app allows users to track their workouts, including types and duration, and provides features like search, filtering, pagination, and localStorage support. It is designed to help users keep a log of their fitness activities, with additional features like user editing and workout management.

## Features
- **Add Workout**: Users can add their workouts (type and time) to the system.
- **Search & Filter**: Users can filter by name and workout type.
- **Pagination**: Users can paginate through the workout list for easier navigation.
- **User Management**: Users can add, edit, or delete their workout data.
- **Local Storage**: Data is stored persistently using localStorage, so the user's data is preserved between sessions.

## Technologies Used
- **Frontend**: Angular 14, Angular Material, Tailwind CSS
- **Backend**: Node.js 16 (for local server and services)
- **Other**: ng2-charts (for charting workout progress)

## Setup

### Prerequisites
Make sure you have the following installed:
- Node.js v16 or later
- Angular CLI v14 or later

### Installation Steps

1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/Snehalpatil2/health-challenge-tracker
    ```

2. Navigate to the project folder:
    ```bash
    cd health-challenge-tracker
    ```

3. Install the required dependencies:
    ```bash
    npm install
    ```

### Running the Application

To run the application in development mode, use the following command:
```bash
ng serve
```

This will start the Angular development server, and you can access the application in your browser at:
```
http://localhost:4200
```

### Testing
To run the tests, use:
```bash
ng test
```

This will run the unit tests for your application and ensure everything is working as expected.

## File Structure

```
/src
  /app
    /components
      health-tracker.component.ts
      health-tracker.component.html
      health-tracker.component.css
    /services
      local-storage.service.ts
    app.module.ts
  /assets
    (assets and styles files)
```

## Contributing

Feel free to fork this project and create a pull request with your contributions. For any issues or enhancements, please create an issue in the repository.

##Author 
- Snehal Jitendra Patil
