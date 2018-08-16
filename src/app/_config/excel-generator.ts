import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { PdfColum } from './pdf-generator';

export function ExportXLS(json, columns: PdfColum[], title: string) {
  const jsonKeys = changeKeys(json, columns);
  const workBook = XLSX.utils.book_new();
  const workSheet = XLSX.utils.json_to_sheet(jsonKeys);

  XLSX.utils.book_append_sheet(workBook, workSheet, 'data');
  XLSX.writeFile(workBook, title + '.xlsx');
}
function changeKeys(json: any[], columns: PdfColum[]): any[] {
  const arrExcel = [];
  json.forEach((row, i) => {
    const obj = {};
    columns.forEach(column => {
      obj[column.name] = row[column.prop];
    });
    arrExcel[i] = obj;
  });
  return arrExcel;
}
