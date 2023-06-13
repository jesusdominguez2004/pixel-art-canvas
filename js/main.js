// JavaScript principal

/**
 * @type HTMLCanvasElement
 */

const canvas = document.getElementById("canvas");
const guide = document.getElementById("guide");
const colorInput = document.getElementById("colorInput");
const toggleGuide = document.getElementById("toggleGuide");
const clearButton = document.getElementById("clearButton");
const drawingContext = canvas.getContext("2d");

const CELL_SIDE_COUNT = 5;
const cellPixelLenght = canvas.width / CELL_SIDE_COUNT;
const colorHistory = {};

// Color predeterminado
colorInput.value = "#009578";

// Inicializar fondo canvas
drawingContext.fillStyle = "#ffffff";
drawingContext.fillRect(0, 0, canvas.width, canvas.height);

// Configurar guía
{
    guide.style.width = `${canvas.width}px`;
    guide.style.height = `${canvas.height}px`;
    guide.style.gridTemplateColumns = `repeat(${CELL_SIDE_COUNT}, 1fr)`;
    guide.style.gridTemplateRows = `repeat(${CELL_SIDE_COUNT}, 1fr)`;

    [... Array(CELL_SIDE_COUNT ** 2)].forEach(() =>
        guide.insertAdjacentHTML("beforeend", "<div></div>")
    );
}

// Defininir funciones
function handleCanvasMousedown(e) {
    if (e.button !== 0) {
        return;
    }

    const canvasBoundigRect = canvas.getBoundingClientRect();
    const x = e.clientX - canvasBoundigRect.left;
    const y = e.clientY - canvasBoundigRect.top;
    const cellX = Math.floor(x / cellPixelLenght);
    const cellY = Math.floor(y / cellPixelLenght);
    const currentColor = colorHistory[`${cellX}_${cellY}`];

    if (e.ctrlKey) {
        if (currentColor) {
            colorInput.value = currentColor;
        }
    } else {
        fillCell(cellX, cellY);
    }
}

function handleClearButtonClick() {
    const yes = confirm("¿Deseas limpiar el Canvas?");

    if (!yes) return;

    drawingContext.fillStyle = "#ffffff";
    drawingContext.fillRect(0, 0, canvas.width, canvas.height);
}

function handleToggleGuideChange() {
    guide.style.display = toggleGuide.checked ? null: "none";
}

function fillCell(cellX, cellY) {
    const starX = cellX * cellPixelLenght;
    const starY = cellY * cellPixelLenght;

    drawingContext.fillStyle = colorInput.value;
    drawingContext.fillRect(starX, starY, cellPixelLenght, cellPixelLenght);
    colorHistory[`${cellX}_${cellY}`] = colorInput.value;
}

// Ajustar funciones a elementos HTML
canvas.addEventListener("mousedown", handleCanvasMousedown);
clearButton.addEventListener("click", handleClearButtonClick);
toggleGuide.addEventListener("change", handleToggleGuideChange);
