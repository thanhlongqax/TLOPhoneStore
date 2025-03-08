import PropTypes from 'prop-types';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const validTotalPages = totalPages && totalPages > 0 ? totalPages : 1;
  const startPage = Math.max(1, currentPage - 3);
  const endPage = Math.min(validTotalPages, currentPage + 3);

  return (
      <nav aria-label="Page navigation example gap 2">
        <ul className="inline-flex -space-x-px text-sm ">
          <li>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                disabled={currentPage === 1}
            >
              Trang trước
            </button>
          </li>

          {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
            const pageNumber = startPage + index;
            return (
                <li key={pageNumber}>
                  <button
                      onClick={() => onPageChange(pageNumber)}
                      className={`flex items-center justify-center px-3 h-8 leading-tight ${
                          currentPage === pageNumber
                              ? 'text-blue-600 bg-blue-50 border-blue-500'
                              : 'text-gray-500 bg-white border-gray-300'
                      } hover:bg-gray-100 hover:text-gray-700`}
                  >
                    {pageNumber}
                  </button>
                </li>
            );
          })}

          <li>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                disabled={currentPage === validTotalPages}
            >
              Trang sau
            </button>
          </li>
        </ul>
      </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
