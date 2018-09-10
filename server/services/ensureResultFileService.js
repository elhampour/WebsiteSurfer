import fs from 'fs-extra';
import Excel from 'exceljs';

export default function* (path) {
    let cdcdcd = yield fs.pathExists(path);
    if (cdcdcd) {
        return;
    }
    yield fs.ensureFile(path);
    let workbook = new Excel.Workbook();
    var worksheet = workbook.addWorksheet('Sites');
    worksheet.columns = [
        { header: 'Id', key: 'id', width: 10 },
        { header: 'Url', key: 'url', width: 100 }
    ];
    yield workbook.xlsx.writeFile(path);
};