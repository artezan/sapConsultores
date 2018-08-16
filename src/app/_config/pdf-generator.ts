import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
export interface PdfColum {
  name: string;
  prop: string;
  type: string;
}

export function PDFGenerator(
  columns: PdfColum[],
  rows: any[],
  width = 500,
  title = 'Tabla',
  subheader = '',
  subheader2 = ''
) {
  const withTable = getArray(columns.length, width);
  const data = generateTablePdf(columns, rows);
  const docDefinition = {
    content: [
      // headers
      {
        text: title + '\n\n',
        style: 'header'
      },
      {
        text: subheader,
        style: 'subheader'
      },
      {
        text: subheader2,
        style: 'subheader2'
      },
      // linea
      {
        table: {
          widths: ['*'],
          body: [[' '], [' ']]
        },
        layout: {
          hLineWidth: function(i, node) {
            return i === 0 || i === node.table.body.length ? 0 : 2;
          },
          vLineWidth: function(i, node) {
            return 0;
          }
        }
      },
      // table
      {
        style: 'tableExample',
        table: {
          widths: withTable,
          headerRows: 1,
          // dontBreakRows: true,
          // keepWithHeaderRows: 1,
          body: data.table
        }
      },
      // linea final
      {
        table: {
          widths: ['*'],
          body: [[' '], [' ']]
        },
        layout: {
          hLineWidth: function(i, node) {
            return i === 0 || i === node.table.body.length ? 0 : 2;
          },
          vLineWidth: function(i, node) {
            return 0;
          }
        }
      }
      /*  {
        text: 'totalTilte',
        alignment: 'justify'
      } */
    ],
    styles: {
      header: {
        fontSize: 24,
        bold: true
      },
      bigger: {
        fontSize: 15,
        italics: true
      },
      center: {
        'text-align': 'center'
      },
      rightme: {
        alignment: 'right'
      },
      subheader: {
        fontSize: 18,
        bold: true
      },
      subheader2: {
        fontSize: 15,
        bold: true
      },
      tableExample: {
        margin: [0, 5, 0, 15],
        alignment: 'center'
      }
    }
  };
  pdfMake.createPdf(docDefinition).download(title.replace(/\s/g, '') + '.pdf');
}
function generateTablePdf(
  columns: PdfColum[],
  rows: any[]
): { table: any; total: number } {
  let finalTotal = 0;
  const arrTable = [];
  const arrHeader = [];
  columns.forEach(colum => {
    arrHeader.push({ text: colum.name, style: 'subheader2' });
  });
  arrTable.push(arrHeader);
  rows.forEach(item => {
    const row = [];
    columns.forEach(colum => {
      if (colum.type === 'money') {
        row.push('$' + item[colum.prop]);
        finalTotal += +item[colum.prop];
      } else if (colum.type === 'boolean') {
        if (item[colum.prop]) {
          row.push('Sí');
        } else {
          row.push('No');
        }
      } else if (colum.type === 'date') {
        row.push(formatDates(item[colum.prop]));
      } else {
        row.push(item[colum.prop]);
      }
    });
    arrTable.push(row);
  });
  return { table: arrTable, total: finalTotal };
}
function getArray(numberItems: number, width: number): number[] {
  const fillWith = width / numberItems;
  return Array(numberItems).fill(fillWith);
}
function formatDates(dateInput: Date): string {
  const day: string = new Date(dateInput).getDate().toString();
  const month: string = (new Date(dateInput).getMonth() + 1).toString();
  const year: string = new Date(dateInput).getFullYear().toString();
  const date = day + '/' + month + '/' + year;
  return date;
}
