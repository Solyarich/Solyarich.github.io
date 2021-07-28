# Жизнь диктует свои законы, или Клеточные автоматы и машинная графика

Правила:

1. Соседями клетки считаются все клетки, находящиеся в восьми ячейках, расположенных
рядом с данной по горизонтали, вертикали или диагонали.
2. Если у некоторой клетки меньше двух соседей, она погибает от одиночества. Если клетка
имеет больше трех соседей, она погибает от тесноты.
3. Если рядом с пустой ячейкой окажется ровно три соседние клетки Жизни, то в этой
ячейке рождается новая клетка.
4. Гибель и рождение происходят в момент смены поколений. Таким образом, гибнущая
клетка может способствовать рождению новой, но рождающаяся клетка не может воскресить
гибнущую, и гибель одной клетки, уменьшив локальную плотность населения, не может
предотвратить гибель другой.

Ипользовалась библиотека p5.js