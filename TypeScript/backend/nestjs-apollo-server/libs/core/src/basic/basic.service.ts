import { Injectable } from '@nestjs/common';
import { DeleteResult, Raw, Repository } from 'typeorm';
import dayjs from 'dayjs';
import { UserInputError } from 'apollo-server-express';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class BasicService<T> {
  constructor(protected repository: Repository<T>) {}

  find(data: any): Observable<T[]> {
    return from(this.repository.find({ ...data }));
  }

  findOne(id: number): Observable<T> {
    return from(this.repository.findOne(id));
  }

  public createOne<P>(data: P | T): Observable<T> {
    return from(this.repository.save(data)).pipe(
      map((data: T) => data),
      catchError((err) => throwError(err)),
    );
  }

  public removeOne(id: number): Observable<boolean> {
    return from(this.repository.delete(id)).pipe(
      map((data: DeleteResult) => {
        const { raw } = data;
        return !!raw.length;
      }),
    );
  }

  public updateOne<P>(id: number, data: P | T): Observable<T> {
    return from(this.repository.update(id, data)).pipe(
      switchMap(() => this.findOne(id)),
    );
  }

  public paginated(args: any) {
    const { first, last, after, before, ...searchParams } = args;

    if (!first && after) throw new UserInputError('after must be with first');

    if (first && last)
      throw new UserInputError(
        'Passing both `first` and `last` to paginate  connection is not supported.',
      );

    if (after && before)
      throw new UserInputError(
        'Passing both `after` and `before` to paginate  connection is not supported.',
      );

    const conditions = new Map<string, any>();

    if (first && !after && !before) {
      conditions.set('take', first + 1);
    }

    if (first && after) {
      const afterString = Buffer.from(after, 'base64').toString();
      const date = dayjs(afterString).format('YYYY-MM-DD HH:mm:ss.SSS');
      conditions.set(
        'createdAt',
        Raw((alias) => `${alias} > '${date}'`),
      );
      conditions.set('take', first + 1);
    }

    if (last && !before && !before) {
      conditions.set('take', last + 1);
    }

    if (last && before) {
      const beforeString = Buffer.from(before, 'base64').toString();
      const date = dayjs(beforeString).format('YYYY-MM-DD HH:mm:ss.SSS');
      conditions.set(
        'createdAt',
        Raw((alias) => `${alias} < '${date}'`),
      );
      conditions.set('take', last + 1);
    }

    return from(
      this.find({ ...Object.fromEntries(conditions), where: searchParams }),
    ).pipe(
      map((data) => {
        let dataList = [];
        let rowDates = [];
        let hasNextPage = false;
        let hasPreviousPage = false;

        if (first && !after && !before) {
          hasNextPage = data.length > first;
          hasPreviousPage = false;
          rowDates = hasNextPage ? data.slice(0, -1) : data;
        }

        if (first && after) {
          hasPreviousPage = true;
          hasNextPage = data.length > first;
          rowDates = hasNextPage ? data.slice(0, -1) : data;
        }

        if (last && !before && !before) {
          hasNextPage = false;
          hasPreviousPage = data.length > last;
          rowDates = hasPreviousPage ? data.splice(0, -1) : data;
        }

        if (last && before) {
          hasNextPage = true;
          hasPreviousPage = data.length > last;
          rowDates = hasPreviousPage ? data.slice(0, -1) : data;
        }

        dataList = rowDates.map((item) => {
          return {
            cursor: Buffer.from(item.createdAt.toISOString()).toString(
              'base64',
            ),
            node: item,
          };
        });
        return {
          edges: dataList,
          nodes: rowDates,
          pageInfo: {
            startCursor: dataList[0]?.cursor || null,
            endCursor: dataList[dataList.length - 1]?.cursor || null,
            hasNextPage,
            hasPreviousPage,
          },
        };
      }),
    );
  }
}
