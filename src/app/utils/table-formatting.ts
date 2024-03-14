import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface TableFormattingOptions<T> {
  dataSource: MatTableDataSource<T>;
  paginator: MatPaginator;
  pageIndexKey: string;
  pageSizeKey: string;
}

export function setTablePagination<T>({
  dataSource,
  paginator,
  pageIndexKey,
  pageSizeKey,
}: TableFormattingOptions<T>): void {
  const pageIndex = parseInt(localStorage.getItem(pageIndexKey) || '0');
  const pageSize = parseInt(localStorage.getItem(pageSizeKey) || '10');

  paginator.pageIndex = pageIndex;
  paginator.pageSize = pageSize;

  paginator.page.subscribe((event) => {
    localStorage.setItem(pageIndexKey, event.pageIndex.toString());
    localStorage.setItem(pageSizeKey, event.pageSize.toString());
    dataSource.paginator = paginator;
  });

  dataSource.paginator = paginator;
}
