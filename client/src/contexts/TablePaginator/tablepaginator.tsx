import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import { ChangeEvent,  MouseEvent,} from "react";

/**
 * @param {Object} props
 * @param {number} props.count
 * @param {number} props.page
 * @param {number} props.rowsPerPage
 * @param {function} props.onRowsPerPageChange
 * @param {function} props.onPageChange
 *
 */

interface RowsProps {
  onRowsPerPageChange: (...args:any[]) => void;
  onPageChange: (...args:any[]) => void;
  rows: number;
}
export default function TablePaginator(props: RowsProps): JSX.Element {
  const { onPageChange, onRowsPerPageChange, ...rest } = props;

  const handleRowsPerPage = (event: ChangeEvent, rows: number) => {
    onPageChange(event, 0);
    onRowsPerPageChange(event, rows);
  };

  return (
    <TablePagination
      {...rest}
      component="div"
      colSpan={3}
      labelRowsPerPage="Itens por página"
      labelDisplayedRows={({ from, to, count }) => {
        return `${from}–${to} de ${count !== -1 ? count : `mais de ${to}`}`;
      }}
      onRowsPerPageChange={handleRowsPerPage}
      onPageChange={({onPageChange})}
      ActionsComponent={TablePaginatorActions}
    />
  );
}

function TablePaginatorActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: MouseEvent) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: MouseEvent) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: MouseEvent) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: MouseEvent) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? (
          <Icon>last_page</Icon>
        ) : (
          <Icon>first_page</Icon>
        )}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <Icon>keyboard_arrow_right</Icon>
        ) : (
          <Icon>keyboard_arrow_left</Icon>
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <Icon>keyboard_arrow_left</Icon>
        ) : (
          <Icon>keyboard_arrow_right</Icon>
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? (
          <Icon>first_page</Icon>
        ) : (
          <Icon>last_page</Icon>
        )}
      </IconButton>
    </Box>
  );
}
