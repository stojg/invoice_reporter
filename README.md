# Time reporter

Checkout, change the `const RATE` in the index.js for a real shoddy estimation of taxes and payslip etc

create a `report.txt` in the root of the folder, with this format

```
freetext, monday 17th sometimesoma
3:43 task1

tuesday 18th
0:59 task2

wednesday 19th
4:33 task1
```

```
> time_reporter@1.0.0 start /Users/stojg/Sites/time_reporter
> node index.js report.txt

freetext, monday 17th sometimesoma
3:43 task1                                                                      (3.72)

tuesday 18th
0:59 task2                                                                      (0.98)

wednesday 19th
4:33 task1                                                                      (4.55)
------------------------------------------------------------------------------------------
task1: 8.27 hours
task2: 0.98 hours

total: 9.25 hrs

------------
subtotal: $462.5
total: $531.87 ($69.37 gst)

hnry: $4.62
acc: $7.8
income tax: $48.56
---
income: $401.52
```





