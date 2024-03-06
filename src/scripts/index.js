#!/usr/bin/env node

'use strict'

module.exports = (() => {
    console.time('Launch')

    const api  = require('./api')

    let STATE = {
        X: {
            name: '',
            numbers: []
        },
        Y: {
            name: '',
            numbers: []
        }
    }

    document.querySelector('#file').addEventListener('change', e => {
        e.preventDefault()

        let file = e.target.files[0]

        if (!file) {
            return;
        }

        const reader = new FileReader()

        let col = 1

        reader.onload = event => {
            const data = event.target.result

            const workbook = new ExcelJS.Workbook();
            workbook.xlsx.load(data).then(() => {
                const worksheet = workbook.worksheets[0];

                worksheet.eachRow((row, rowNumber) => {
                    if (rowNumber > 0) {
                        if (row._number === 1) {
                            STATE.X.name = row.values[1]
                            STATE.Y.name = row.values[2]
                            return false
                        }

                        STATE.X.numbers.push(row.values[1])
                        STATE.Y.numbers.push(row.values[2])
                    }
                });

                api(STATE)
                document.querySelector('.section__button').style.display = 'block'
                document.querySelector('#file').value = ''
            });
        }

        reader.readAsArrayBuffer(file)
    })

    document.querySelector('.info-button')?.addEventListener('click', () => {
        document.querySelector('.info__from-pop').style.display = 'flex'
        document.querySelector('.info__from-container').style.display = 'block'
    })

    document.querySelector('.close__info')?.addEventListener('click', () => {
        document.querySelector('.info__from-pop').style.display = 'none'
        document.querySelector('.info__from-container').style.display = 'none'
    })

    document.querySelector('.button__reset').addEventListener('click', e => {
        document.querySelector('.v1').innerHTML = ''
        document.querySelector('.v2').innerHTML = ''
        document.querySelector('#chart').innerHTML = ''
        document.querySelector('.file__upload-container').style.display = 'flex'
        document.querySelector('.section__button').style.display = 'none'
        STATE.X.name = ''
        STATE.Y.name = ''
        STATE.X.numbers.length = 0
        STATE.Y.numbers.length = 0
    })

    console.timeEnd('Launch')

    return false

})(0)
