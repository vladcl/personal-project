import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import { MouseEvent } from "react";
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from "@mui/icons-material";

interface RowsProps {
  onRowsPerPageChange: (...args: any[]) => void;
  onPageChange: (...args: any[]) => void;
  count: number;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions: number[];
}

export default function TablePaginator(props: RowsProps): JSX.Element {
  const { onPageChange, onRowsPerPageChange, ...rest } = props;

  const handleRowsPerPage = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    onPageChange(event, 0);
    onRowsPerPageChange(event);
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
      onPageChange={onPageChange}
      ActionsComponent={TablePaginatorActions}
    />
  );
}
interface PaginatorProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (...args: any[]) => void;
}

function TablePaginatorActions(props: PaginatorProps) {
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
        {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
      </IconButton>
    </Box>
  );
}
