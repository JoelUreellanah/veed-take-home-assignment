import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { fetchVideos, setPage } from '@/redux/videosSlice';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination() {
  const dispatch = useAppDispatch();
  const { query, total } = useAppSelector(state => state.videos);
  const { page, pageSize } = query;

  const totalPages = Math.ceil(total / pageSize || 1);

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let start = Math.max(2, page - 1);
      let end = Math.min(totalPages - 1, page + 1);

      if (page <= 2) {
        end = 4;
      }

      if (page >= totalPages - 1) {
        start = totalPages - 3;
      }

      if (start > 2) {
        pages.push(-1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push(-2);
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    dispatch(setPage(newPage));

    const queryParams = {
      ...query,
      page: newPage,
      tags: query.tags ? query.tags.join(',') : undefined,
    };

    dispatch(fetchVideos(queryParams));
  };

  return (
    <div className="flex justify-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => changePage(page - 1)}
        disabled={page === 1 || total === 0}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>

      {pageNumbers.map((pageNumber, index) =>
        pageNumber < 0 ? (
          <span key={`ellipsis-${index}`} className="px-3 py-2">
            ...
          </span>
        ) : (
          <Button
            key={pageNumber}
            variant={page === pageNumber ? 'default' : 'outline'}
            size="icon"
            onClick={() => changePage(pageNumber)}
            className="w-9"
          >
            {pageNumber}
          </Button>
        ),
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={() => changePage(page + 1)}
        disabled={page === totalPages || total === 0}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </div>
  );
}
