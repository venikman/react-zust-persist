import App from './App.jsx';
import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// App.jsx
import React from 'react';

function App() {
  return (
    <div>
      <h1>Hello, world!</h1>
    </div>
  );
}

export default App;

// index.html (needs to be created in a src/client folder)
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React App</title>
</head>
<body>
  <div id="root"></div>
  <script src="/src/client/index.jsx"></script> </body>
</html>