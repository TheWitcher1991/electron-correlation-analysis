module.exports = function (STATE) {

    const average = numbers => numbers.reduce((acc, number) => acc + number, 0) / numbers.length

    const sum = (numbers, f = 1) => numbers.reduce((acc, number) => acc + number ** f)

// Ковариации
    const covariance = (arr1, arr2) => {
        const Z1 = average(arr1);
        const Z2 = average(arr2);
        return arr1.reduce((a, b, i) => a + (b - Z1) * (arr2[i] - Z2), 0) / arr1.length;
    }

// Уравнение регрессии
    const regression = (Xs, Ys) => {
        let avX = average(Xs),
            avY = average(Ys)

        let covarianceX = 0,
            varianceX = 0

        for (let i = 0; i < Xs.length; i++) {
            covarianceX += covariance(Xs, Ys)
            varianceX += Math.pow(Xs[i] - avX, 2)
        }

        return {
            slope: covarianceX / varianceX,
            intercept: avY - (covarianceX / varianceX) * avX,
        }
    }

// Дисперсия
    const dispersion = (X) => {
        const Z = average(X)
        return X.reduce((a, b) => a + (b - Z) * (b - Z), 0) / X.length
    }

// Среднее квадратичное отклонение
    const deviation = (dispersion) => Math.sqrt(dispersion).toFixed(6)

// Коэф корреляции
    const correlation = (X, Y, f = 2) => {
        let xS = 0, yS = 0, R1 = 0, R2 = 0, R3 = 0

        xS = average(X)
        yS = average(Y)

        X.forEach((el, i) => {
            R1 += (X[i] - xS) * (Y[i] - yS)
            R2 += (X[i] - xS) ** 2
            R3 += (Y[i] - yS) ** 2
        })

        return (R1 / Math.sqrt(R2 * R3)).toFixed(f)
    }

// Ошибка репрезентативности
    const representativeness = (arr) => deviation(dispersion(arr)) / Math.sqrt(arr.length)

// t-статистика Стьюдента
    const tStat = (K, n) => (K * Math.sqrt(n - 2) / Math.sqrt(1 - K ** 2)).toFixed(2)

// t-критерий Стьюдента
    const tCorrelation = (X, Y) => ((average(Y) - average(X)) / (
        Math.sqrt(dispersion(Y) / Y.length + dispersion(X) / X.length)
    )).toFixed(3)

// Нормированный R-квадрат
    const normalCorrelation = (R, n) => (1 - (1 - R) * (n - 1) / (n - 2)).toFixed(9)

// Стандартная ошибка
    const SE = (des, R, n) => Math.sqrt(des * (1 - R) / n).toFixed(9)

// Фактическое значение F-критерия Фишера
    const fValue= (R, n) => (R / (1 - R)) * ((n - 2))

    let Xs = STATE.X.numbers
    let Ys = STATE.Y.numbers

    let dov = '0.5'

    // Дисперсионный анализ
    let correlationCoff = correlation(Xs, Ys),
        tstat = tStat(correlationCoff, Xs.length),
        ka = regression(Xs, Ys).slope.toFixed(2),
        kb = regression(Xs, Ys).intercept.toFixed(2),
        dis = dispersion(Xs),
        dev = deviation(dis),
        trasp = tCorrelation(Xs, Ys),
        predicted = (regression(Xs, Ys).slope * Xs.length + regression(Xs, Ys).intercept).toFixed(2)

    // Регрессионная статистика
    let disY = dispersion(Ys),
        R1 = correlation(Xs, Ys, 9),
        R2 = (R1 ** 2).toFixed(9),
        se = SE(disY, R2 ** 2, Xs.length),
        R3 = normalCorrelation(R2, Xs.length),
        fvalue = fValue(R2, Xs.length).toFixed(9)

    let v1 = ` 
        <h3>Дисперсионный анализ</h3>
        <div class="ctx">Коэф. Корреляции: <span>${correlationCoff}</span></div>
        <div class="ctx">t-статистика Стьюдента: <span>${tstat}</span></div>
        <div class="ctx">Коэф. уравнения A: <span>${ka}</span></div>
        <div class="ctx">Коэф. уравнения B: <span>${kb}</span></div>
        <div class="ctx">Уравнение регрессии: <span>y = ${ka}x + ${kb}</span></div>
         <div class="ctx">Прогнозируемое значение (x = ${Xs.length}): <span>y = ${predicted}</span></div>
        <div class="ctx">Доверительная вероятность: <span>${dov}</span></div>
        <div class="ctx">Число степеней свободы: <span>${Xs.length}</span></div>
        <div class="ctx">Табл. значение t-статистики Стьюдента: <span>${trasp}</span></div>
        <div class="ctx">Дисперсия: <span>${dis}</span></div>
        <div class="ctx">Среднее квадратичное отклонение: <span>${dev}</span></div>
        `

    let v2 = `
        <h3>Регрессионная статистика</h3>
        <div class="ctx">Множественный R: <span>${R1}</span></div>
        <div class="ctx">R-квадрат: <span>${R2}</span></div>
        <div class="ctx">Нормированный R-квадрат: <span>${R3}</span></div>
        <div class="ctx">F-критерий Фишера: <span>${fvalue}</span></div>
        <div class="ctx">Стандартная ошибка: <span>${se}</span></div>
        <div class="ctx">Наблюдения: <span>${Xs.length}</span></div>
        `

    document.querySelector('.v1').innerHTML = v1
    document.querySelector('.v2').innerHTML = v2
    document.querySelector('.file__upload-container').style.display = 'none'

    new ApexCharts(document.querySelector(`#chart`), {
        chart: {
            id: 'chart',
            type: 'line',
            height: 350,
            foreColor: "#fff",
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
            zoom: {
                enabled: false
            }
        },
        stroke: {
            width: [6],
            curve: 'straight'
        },
        markers: {
            size: [5]
        },
        grid: {
            borderColor: '#e1e1e1',
            clipMarkers: false,
            yaxis: {
                lines: {
                    show: true
                }
            }
        },
        title: {
            text: `Корреляционное поле y = ${ka}x + ${kb}`,
            align: 'left',
            style: {
                color: "#111"
            }
        },
        dataLabels: {
            enabled: false
        },
        fill: {
            gradient: {
                enabled: true,
                opacityFrom: 0.6,
                opacityTo: 0
            }
        },
        series: [
            {
                name: STATE.Y.name,
                data: Ys
            }
        ],
        xaxis: {
            categories: Xs,
            title: {
                text: STATE.Y.name,
                style: {
                    color: "#111"
                }
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            labels: {
                style: {
                    colors: '#989898'
                }
            }
        },
        legend: {
            show: true
        },
        yaxis: {
            title: {
                text: STATE.X.name,
                style: {
                    color: "#111"
                }
            },
            labels: {
                offsetX: -5,
                style: {
                    colors: '#989898'
                }
            }
        },
        tooltip: {
            theme: 'dark'
        }
    }).render()

    document.querySelector('.button__save')?.addEventListener('click', e => {
        e.preventDefault()

        const workbook = new ExcelJS.Workbook();

        const worksheet = workbook.addWorksheet('Корреляционный анализ')

        STATE.X.numbers.unshift(STATE.X.name)
        STATE.Y.numbers.unshift(STATE.Y.name)

        worksheet.getColumn(1).values = STATE.X.numbers
        worksheet.getColumn(2).values = STATE.Y.numbers

        worksheet.getColumn(1).width = 35
        worksheet.getColumn(2).width = 35
        worksheet.getColumn(1).alignment = { horizontal: 'left' }
        worksheet.getColumn(2).alignment = { horizontal: 'left' }
        worksheet.getColumn(1).font = { size: 12 }
        worksheet.getColumn(2).font = { size: 12 }

        worksheet.getRow(1).font = { bold: true, size: 14 }
        worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' }

        worksheet.addRow(['', '', '', 'Дисперсионный анализ'])
        worksheet.addRow(['', '', '', 'Коэф. Корреляции:', correlationCoff]);
        worksheet.addRow(['', '', '', 't-статистика Стьюдента:', tstat]);
        worksheet.addRow(['', '', '', 'Коэф. уравнения A:', ka]);
        worksheet.addRow(['', '', '', 'Коэф. уравнения B:', kb]);
        worksheet.addRow(['', '', '', 'Уравнение регрессии:', `y = ${ka}x + ${kb}`]);
        worksheet.addRow(['', '', '', `Прогнозируемое значение (x = ${Xs.length - 1}):`, predicted]);
        worksheet.addRow(['', '', '', 'Доверительная вероятность:', dov]);
        worksheet.addRow(['', '', '', 'Число степеней свободы:', Xs.length - 1]);
        worksheet.addRow(['', '', '', 'Табл. значение t-статистики Стьюдента:', trasp]);
        worksheet.addRow(['', '', '', 'Дисперсия:', dis]);
        worksheet.addRow(['', '', '', 'Среднее квадратичное отклонение:', dev]);

        worksheet.addRow(['']);

        worksheet.addRow(['', '', '', 'Регрессионная статистика']);
        worksheet.addRow(['', '', '', 'Множественный R:', R1]);
        worksheet.addRow(['', '', '', 'R-квадрат:', R2]);
        worksheet.addRow(['', '', '', 'Нормированный R-квадрат:', R3]);
        worksheet.addRow(['', '', '', 'F-критерий Фишера:', fvalue]);
        worksheet.addRow(['', '', '', 'Стандартная ошибка:', se]);
        worksheet.addRow(['', '', '', 'Наблюдения:', Xs.length - 1]);

        // worksheet.getRow(1).font = { bold: true }

        workbook.xlsx.writeBuffer().then((buffer) => {
            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'CA-Отчет.xlsx');
        });
    })

}


