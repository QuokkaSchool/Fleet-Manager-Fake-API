import { Request } from 'express';

export interface ListResponse<ItemsType> {
  items: ItemsType[];
  info: {
    page: number;
    limit: number;
    totalResults: number;
  }
}

export class ApiParamsBuilder {
  public static buildList(data: unknown[], req: Request, hasPagination: boolean = true, hasSorting: boolean = true) {
    // @TODO: Filtering: ?[paramKey]=[value]
    // Sorting:     ?sort=name&order=desc
    // Pagination:  ?page=1&limit=10
    // @TODO: Search:      ?searchKey=NameOfKey&searchValue=value

    const builtResponse = {
      items: data,
      info: {
        page: 1,
        limit: data.length,
        totalResults: data.length,
      }
    }

    if (hasSorting) {
      const { sort, order } = req.query;

      if (sort && order) {
        const sortedItems = builtResponse.items.sort((a, b) => {
          const fieldA = a[sort as string].toLowerCase();
          const fieldB = b[sort as string].toLowerCase();

          if (fieldA < fieldB) {
            return order === 'asc' ? -1 : 1;
          }
          if (fieldA > fieldB) {
            return order === 'asc' ? 1 : -1;
          }
          return 0;
        });

        builtResponse.items = sortedItems;
      }
    }

    if (hasPagination) {
      const { page, limit } = req.query;

      if (page && limit) {
        const startIndex = (Number(page) - 1) * Number(limit);
        const endIndex = startIndex + Number(limit);
        const paginatedItems = builtResponse.items.slice(startIndex, endIndex);

        builtResponse.items = paginatedItems;
        builtResponse.info.page = Number(page);
        builtResponse.info.limit = Number(limit);
      }
    }

    return builtResponse;
  }
}
