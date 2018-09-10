import cheerio from 'cheerio';
import Excel from 'exceljs';
import fs from 'fs-extra';
import path from 'path';

export default function* (resultPath, sites, currentIndex) {

    let ssss = path.resolve(resultPath);
    let workbook = new Excel.Workbook();
    yield workbook.xlsx.readFile(resultPath);
    var worksheet = workbook.getWorksheet(1);

    for (let index = 0; index < sites.length; index++) {
        var row = worksheet.getRow(index + 2 + currentIndex);
        row.getCell(1).value = (currentIndex+index + 1);
        row.getCell(2).value = sites[index];
        row.commit();
        yield workbook.xlsx.writeFile(resultPath);
    }
};