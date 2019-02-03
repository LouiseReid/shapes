use layers
db.dropDatabase()

db.shapes.insertMany([
{"levelDesc": "Drag the square onto the red line", "layer": {"attrs":{},"className":"Layer","children":[{"attrs":{"name":"circle","result":false,"x":532.5,"y":104.5,"radius":50,"fill":"#61bc5c","stroke":"#000","opacity":0.8,"shaddowColor":"black","shadowBlur":10,"shadowOffsetX":5,"shadowOffsetY":5,"shadowOpacity":0.6,"strokeWidth":1,"draggable":true},"className":"Circle"},{"attrs":{"name":"square","result":true,"x":177.5,"y":104.5,"width":100,"height":100,"fill":"#61bc5c","stroke":"#000","opacity":0.8,"shaddowColor":"black","shadowBlur":10,"shadowOffsetX":5,"shadowOffsetY":5,"shadowOpacity":0.6,"strokeWidth":1,"draggable":true},"className":"Rect"},{"attrs":{"name":"goal","x":245,"y":313.5,"width":110,"height":7,"fill":"#e20d0d"},"className":"Rect"}]}}
])
