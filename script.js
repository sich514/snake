body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #000;
    color: #fff;
}

h1 {
    margin-bottom: 20px;
}

canvas {
    border: 1px solid #000;
    background-color: #5d744b;
}

.title {
    color: #5d744b;
    font-family: 'Courier New', Courier, monospace;
    font-size: 20px;
    text-align: center;
}

.links {
    margin-top: 20px;
    display: flex;
    gap: 20px; /* Расстояние между ссылками */
}

.links a {
    color: #5d744b;
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
    text-decoration: none;
}

.links a:hover {
    text-decoration: underline;
}
