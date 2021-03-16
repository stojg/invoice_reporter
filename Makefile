all:
	pegjs main.pegjs && node index.js ./report.txt