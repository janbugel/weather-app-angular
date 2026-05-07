import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

export interface TableFormattingOptions<T> {
  dataSource: MatTableDataSource<T>;
  paginator: MatPaginator;
  /** Namespace used for the localStorage keys; pick a unique value per table. */
  storageNamespace: string;
}

/**
 * Wires a paginator to a data source and persists pageIndex / pageSize
 * under a per-table namespace. Returns the page subscription so callers
 * can unsubscribe in ngOnDestroy.
 */
export function setTablePagination<T>({
  dataSource,
  paginator,
  storageNamespace,
}: TableFormattingOptions<T>): Subscription {
  const indexKey = `${storageNamespace}.pageIndex`;
  const sizeKey = `${storageNamespace}.pageSize`;

  paginator.pageIndex = parseInt(localStorage.getItem(indexKey) ?? '0', 10) || 0;
  paginator.pageSize = parseInt(localStorage.getItem(sizeKey) ?? '10', 10) || 10;

  const subscription = paginator.page.subscribe((event) => {
    localStorage.setItem(indexKey, event.pageIndex.toString());
    localStorage.setItem(sizeKey, event.pageSize.toString());
  });

  dataSource.paginator = paginator;
  return subscription;
}
